import { connect } from "react-redux";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { styles } from ".";
import clubStore, { listOfClubs } from "@source/clubStore";
import playerStore from "@source/playerStore";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { addDays } from "@utils/clientFuncs";
import { fetchOffersAction, callOffOfferAction, acceptOfferAction, removeErrorAction } from "@store/actions";

const Offers = (props) => {
  const {
    auth: { club },
    fetchOffersAction,
    acceptOfferAction,
    callOffOfferAction,
    removeErrorAction,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [offersSent, setOffersSent] = useState(null);
  const [offersReceived, setOffersReceived] = useState(null);

  useEffect(() => fetchOffersAction(), []);

  useEffect(() => {
    if (props.offers?.length) {
      setOffersSent(props.offers.filter((x) => x.to !== club));
      setOffersReceived(props.offers.filter((x) => x.from !== club));
    }
  }, [props.offers]);

  useEffect(() => {
    if (props.error && props.error[0] && props.error[0] !== "ACCEPT_OFFER") {
      enqueueSnackbar(props.error[0], { variant: "error" });
      removeErrorAction("all");
    }
  }, [props.error]);

  const callOffOfferHandler =
    ({ _id, player, from, to }) =>
    () => {
      callOffOfferAction({ player, from, to });
      setOffersSent(offersSent.filter((x) => x._id !== _id));
      setOffersReceived(offersReceived.filter((x) => x._id !== _id));
    };

  const acceptOfferHandler =
    ({ _id, player, from, to }) =>
    () => {
      acceptOfferAction({ player, from, to });
      setOffersSent(offersSent.filter((x) => x._id !== _id));
      setOffersReceived(offersReceived.filter((x) => x._id !== _id));
    };

  return (
    <Paper className={styles.offers}>
      <Typography variant="h6" component="h1" sx={{ textAlign: "center" }}>
        {offersSent?.length || offersReceived?.length
          ? `Transfer Offer${offersSent?.length + offersReceived?.length > 0 ? "s" : null} ~ ${
              offersSent?.length + offersReceived?.length
            }`
          : "No offer received yet"}
      </Typography>
      {(offersSent || offersReceived) && (
        <>
          {offersSent ? (
            offersSent.length ? (
              <OffersComponent offer="to" club={club} offers={offersSent} callOffOfferHandler={callOffOfferHandler} />
            ) : null
          ) : null}
          {offersReceived ? (
            offersReceived.length ? (
              <OffersComponent
                club={club}
                offer="from"
                offers={offersReceived}
                acceptOfferHandler={acceptOfferHandler}
                callOffOfferHandler={callOffOfferHandler}
              />
            ) : null
          ) : null}
        </>
      )}
    </Paper>
  );
};

const mapStateToProps = (state) => ({
    error: state.error,
    offers: state.mass.offers,
  }),
  mapDispatchToProps = { fetchOffersAction, callOffOfferAction, acceptOfferAction, removeErrorAction };

export default connect(mapStateToProps, mapDispatchToProps)(Offers);

const OffersComponent = ({ offers, offer, club, acceptOfferHandler, callOffOfferHandler }) => (
  <Paper className={styles.offer} elevation={0}>
    <Typography color="green" sx={{ textDecoration: "underline" }}>
      {offer === "from" ? "Offers Received" : "Offers Sent"}
    </Typography>

    {offers.map(({ player, from, to, fee, date, _id }, index) => (
      <Paper elevation={4} key={index}>
        <div>
          <main>
            <Image src={`/images/club/${club === from ? to : from}.webp`} alt={clubStore(club).title} width={25} height={25} />
            <Typography fontSize={20} color="green" variant="body2">
              {playerStore(player).name}
            </Typography>
          </main>
          <main>
            <Typography fontSize={16}>{`Fee: $${fee},000`}</Typography>
            <Typography fontSize={16}>
              {offer === "from" ? `Buyer: ${clubStore(from).title}` : `Seller: ${clubStore(to).title}`}
            </Typography>
          </main>
          <main>
            <Typography color="green" fontSize={14} variant="body1" sx={{ textDecoration: "underline" }}>
              Offer Details
            </Typography>
            <Image src={`/images/player/${player}.webp`} alt={playerStore(player).name} width={25} height={20} />
          </main>
          <main>
            <div>
              <Typography variant="body2">Received:&nbsp;</Typography>
              <Typography variant="body1">{new Date(date).toDateString()}</Typography>
            </div>

            <div>
              <Typography variant="body2">Age:&nbsp;</Typography>
              <Typography variant="body1">{playerStore(player).age}yrs</Typography>
            </div>
            <div>
              <Typography variant="body2">Value:&nbsp;</Typography>
              <Typography variant="body1">${playerStore(player).value}m</Typography>
            </div>
            <div>
              <Typography variant="body2">Rating:&nbsp;</Typography>
              <Typography variant="body1">{playerStore(player).rating}cpr</Typography>
            </div>
            <div>
              <Typography variant="body2">Roles:&nbsp;</Typography>
              <Typography variant="body1">
                {playerStore(player).roles.map((role, i, arr) => (i === arr.length - 1 ? `${role}` : `${role} `))}
              </Typography>
            </div>
            <div>
              <Typography variant="body2">Offer Expiry:&nbsp;</Typography>
              <Typography variant="body1">{addDays(date, 7)}</Typography>
            </div>
          </main>
          <main>
            {offer === "to" ? (
              <Button
                color="error"
                variant="contained"
                fullWidth
                sx={{ marginTop: 2 }}
                onClick={callOffOfferHandler({ _id, player, from, to })}>
                Call off Offer
              </Button>
            ) : (
              <ButtonGroup variant="contained" fullWidth sx={{ marginTop: 2 }}>
                <Button onClick={acceptOfferHandler({ _id, player, from, to })}>Accept Fee</Button>
                <Button color="error" onClick={callOffOfferHandler({ _id, player, from, to })}>
                  Reject Offer
                </Button>
              </ButtonGroup>
            )}
          </main>
        </div>
      </Paper>
    ))}
  </Paper>
);
