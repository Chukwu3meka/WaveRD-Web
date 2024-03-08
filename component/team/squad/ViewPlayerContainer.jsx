import clubStore from "@source/clubStore";
import Image from "next/image";
import playerStore from "@source/playerStore";
import { connect } from "react-redux";
import { listPlayerAction, targetPlayerAction, sendOfferAction, releasePlayerAction, removeErrorAction } from "@store/actions";
import HighlightOff from "@mui/icons-material/HighlightOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useEffect, useRef } from "react";
import router from "next/router";
import { Alert, Paper, Typography, Table, TableRow, TableBody, TableCell, TableHead, TableContainer, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ButtonGroup from "@mui/material/ButtonGroup";

import { PlayerTable, styles } from "./";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { sleep } from "@utils/clientFuncs";

import Slider, { SliderThumb } from "@mui/material/Slider";
// import { styled } from "@mui/material/styles";
import { styled } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";

import { useSnackbar } from "notistack";

const ViewPlayerContainer = (props) => {
  if (props.auth && props.viewPlayer) {
    const { setSquad, squad } = props,
      { enqueueSnackbar } = useSnackbar(),
      descriptionElementRef = useRef(null),
      [player, setPlayer] = useState(null),
      [loading, setLoading] = useState(false),
      transferPeriod = [0, 6, 7].includes(new Date().getMonth()),
      [offerValue, setOfferValue] = useState(viewPlayer ? playerStore(viewPlayer).value + 13 : 100),
      {
        listPlayerAction,
        targetPlayerAction,
        sendOfferAction,
        releasePlayerAction,
        removeErrorAction,
        viewPlayer,
        auth,
        setViewPlayer,
      } = props;

    useEffect(() => {
      if (viewPlayer) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [viewPlayer]);

    useEffect(() => {
      if (props.player && viewPlayer) setPlayer({ ...props.player, ...playerStore(viewPlayer) });
    }, [props.player]);

    useEffect(() => {
      if (props.error[0]) {
        if (
          [
            "Illegal Transaction",
            "Insufficient Funds",
            "Max Squad limit reached",
            "Min Squad limit reached",
            "Previous Offer not attended to",
            "Player currently suspended from transfer",
            "Salary Cap will be exceeded after signing",
          ].includes(props.error[0])
        ) {
          enqueueSnackbar(props.error[0], { variant: "warning" });
        }
        if (["LIST_PLAYER", "RELEASE_PLAYER", "TARGET_PLAYER", "SEND_OFFER"].includes(props.error[0])) {
          enqueueSnackbar("An error occured", { variant: "error" });
        }
        removeErrorAction("all");
      }
    }, [props.error]);

    const handleClose = () => setViewPlayer(false);

    const clickHandler =
      (action, { ...props }) =>
      async () => {
        // setLoading(true);
        switch (action) {
          case "list": {
            if (player.transfer.forcedListed)
              return enqueueSnackbar(`${playerStore(player.ref).name} is willing to leave`, { variant: "warning" });

            forcedListed;
            listPlayerAction({ player: viewPlayer, list: !player.transfer.listed });
            setPlayer({ ...player, transfer: { ...player.transfer, listed: !player.transfer.listed } });
            break;
          }
          case "target": {
            targetPlayerAction({ player: viewPlayer, target: !player.transfer.target });
            setPlayer({ ...player, transfer: { ...player.transfer, target: !player.transfer.target } });
            break;
          }
          case "offer": {
            if (player.mySquadLength < process.env.MAX_SQUAD) {
              sendOfferAction({ player: viewPlayer, to: player.club, fee: props.offerValue, player: player.ref });
              setPlayer({ ...player, transfer: { ...player.transfer, offers: [...player.transfer.offers, auth.club] } });
            } else {
              enqueueSnackbar("Squad limit warning", { variant: "warning" });
            }
            break;
          }
          case "release": {
            if (squad.length > process.env.MIN_SQUAD) {
              setPlayer(null);
              releasePlayerAction({ player: viewPlayer });
              setSquad(squad.filter((x) => x.ref !== player.ref));
              enqueueSnackbar(`${player.name}, Succesfully released`, { variant: "success" });
            } else {
              enqueueSnackbar("Squad limit warning", { variant: "warning" });
            }
            break;
          }
          default: {
            enqueueSnackbar("No action taken", { variant: "info" });
          }
        }

        await sleep(0.5);
        setLoading(false);
      };

    //  [...new Array(50)]

    return player ? (
      <Dialog
        className={styles.viewPlayerContainer}
        open={!!viewPlayer}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        // maxWidth
      >
        <DialogContent>
          <div className={styles.viewPlayer}>
            <IconButton color="primary" onClick={handleClose}>
              <HighlightOff />
            </IconButton>

            <Paper elevation={2}>
              <div>
                <Paper elevation={4}>
                  {player.roles.map((role) => (
                    <span key={role}>{role}</span>
                  ))}
                </Paper>
                <div>
                  <Image src={`/images/player/${player.ref}.webp`} layout="fill" alt={`${player.name} SoccerMASS`} />
                </div>
                <Image src={`/images/club/${player.club}.webp`} width={30} height={30} alt={`${player.club} SoccerMASS`} />
              </div>
              <div>
                <div>
                  <b style={{ marginRight: 10, fontSize: "1.4em" }}>{player.name}</b>
                  <Image src={`/images/country/${player.country}.png`} width={17} height={17} alt={`${player.country} SoccerMASS`} />
                </div>

                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress variant="determinate" value={player.energy} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Typography variant="caption" component="div" color="text.secondary">
                      {`${player.energy}%`}
                    </Typography>
                  </Box>
                </Box>
              </div>
              <div>
                <Paper>
                  <em>${player.value}m</em>
                  <Typography component="span" color="grey">
                    value
                  </Typography>
                </Paper>
                <Paper>
                  <em>{player.history.mp}</em>
                  <Typography component="span" color="grey">
                    mp
                  </Typography>
                </Paper>
                <Paper>
                  <em>${Math.round((10 / 100) * player.value)}m</em>
                  <Typography component="span" color="grey">
                    wage
                  </Typography>
                </Paper>
                <Paper>
                  <em>{player.rating}cpa</em>
                  <Typography component="span" color="grey">
                    rating
                  </Typography>
                </Paper>
              </div>
            </Paper>

            <PlayerTable player={player} auth={auth} clickHandler={clickHandler} loading={loading} />
          </div>
        </DialogContent>
      </Dialog>
    ) : null;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
    error: state.error,
    auth: state.profile.auth,
    player: state.player.player,
  }),
  mapDispatchToProps = { listPlayerAction, targetPlayerAction, sendOfferAction, releasePlayerAction, removeErrorAction };

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlayerContainer);
