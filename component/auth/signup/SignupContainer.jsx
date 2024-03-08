import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { CircularProgress, Button } from "@mui/material";

import { Signup } from ".";
import { sleep } from "@utils/clientFuncs";
import { setAuthSlideTextAction, manageClubAction } from "@store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SignupContainer = (props) => {
  const classes = useStyles(),
    [club, setClub] = useState(""),
    [mass, setMass] = useState(null),
    [clubs, setClubs] = useState(null),
    { enqueueSnackbar } = useSnackbar(),
    [players, setPlayers] = useState(""),
    [manager, setManager] = useState(""),
    [loading, setLoading] = useState(false),
    [massData, setMassData] = useState(null),
    [division, setDivision] = useState(null),
    [displayClub, setDisplayClub] = useState(false),
    { setAuthSlideTextAction, masses, manageClubAction } = props,
    [step, setStep] = useState(process.env.NODE_ENV !== "production" ? 2 : 1),
    [massIntro, setMassIntro] = useState("Select Mass & Division to display clubs"),
    [handle, setHandle] = useState(process.env.NODE_ENV !== "production" ? "ChukwuEmeka" : ""),
    [password, setPassword] = useState(process.env.NODE_ENV !== "production" ? "666666c" : ""),
    [email, setEmail] = useState(process.env.NODE_ENV !== "production" ? "maduekwepedro@gmail.com" : "");

  // change auth layout text on each step
  useEffect(() => {
    setAuthSlideTextAction(`signup${step}`);
  }, [step]);

  // detect is signup was succesfull
  useEffect(() => {
    if (props.manageClubStatus) {
      setStep(3);
      setLoading(false);
    }
  }, [props.manageClubStatus]);

  // detect is signup was unsuccesfull
  useEffect(() => {
    if (props.error.includes("MANAGE_CLUB")) {
      setLoading(false);
      enqueueSnackbar("oops!!! something went wrong, we're unable to process your registration, please try again later, Thank you.", {
        variant: "error",
      });
    }
  }, [props.error]);

  const ManageClub = ({ club: selectedClub }) => {
    const manageClubHandler = async () => {
      if (!loading) {
        setClub(selectedClub);
        setLoading(selectedClub);
        await sleep(1);
        manageClubAction({ mass: mass.ref, club: selectedClub, handle, password, division, email });
      } else {
        enqueueSnackbar("Please wait", { variant: "warning" });
      }
    };

    return (
      <div className={classes.wrapper}>
        <Button size="small" color="primary" variant="contained" disabled={loading === selectedClub} onClick={manageClubHandler}>
          manage club
        </Button>
        {loading === selectedClub && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    );
  };
  return (
    <Signup
      ManageClub={ManageClub}
      setValues={{
        setMass,
        setStep,
        setClub,
        setEmail,
        setClubs,
        setHandle,
        setManager,
        setPlayers,
        setPassword,
        setMassData,
        setDivision,
        setMassIntro,
        setDisplayClub,
      }}
      values={{
        mass,
        step,
        club,
        email,
        clubs,
        handle,
        masses,
        manager,
        players,
        division,
        massData,
        password,
        massIntro,
        displayClub,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  manageClubStatus: state.profile.manageClubStatus,
});

const mapDispatchToProps = {
  manageClubAction,
  setAuthSlideTextAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
