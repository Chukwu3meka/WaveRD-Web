import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

import { Reset } from ".";
import validate from "@utils/validator";
import { sleep } from "@utils/clientFuncs";
import { resetPasswordOTPSenderAction, resetPasswordAction, setAuthSlideTextAction } from "@store/actions";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ResetContainer = (props) => {
  const [userData, setUserData] = useState({
      otp: "",
      email: "",
      handle: "",
      password: "",
      otpSent: false,
    }),
    errorMessages = {
      otp: "OTP, can only be Seven digits",
      email: "Uhh, Email invalid or Unavailable",
      handle: "Handle should be readable and cannot be less than three letters",
      password: "Password cannot be less than 7 characters and must contain number(s) and letter(s).",
    };

  const { setAuthSlideTextAction, resetPasswordOTPSenderAction, resetPasswordAction, emailLinkOTP } = props,
    router = useRouter(),
    classes = useStyles(),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [invalidInput, setInvalidInput] = useState({}),
    [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setAuthSlideTextAction("reset");

    const enqueueHandler = async (status) => {
      enqueueSnackbar(`Password Reset ${status ? "was successfull" : "failed"}`, { variant: status ? "success" : "error" });
      if (status) {
        await sleep(2);
        router.push(`/auth/signin`);
      }
    };

    if (emailLinkOTP !== null) enqueueHandler(emailLinkOTP);
  }, []);

  useEffect(() => {
    let mounted = true;
    const finalizePasswordRest = async () => {
      setUserData({ ...userData, otpSent: true });
      if (props.resetPasswordOTP === userData.otp) {
        console.log(props.resetPasswordOTP, userData.otp);

        enqueueSnackbar("Password Reset successfull", { variant: "success" });
        setUserData({
          email: "",
          password: "",
          handle: "",
          otp: "",
          otpSent: false,
        });
        resetPasswordAction({ email: userData.email, handle: userData.handle, otp: props.resetPasswordOTP });
        await sleep(2);
        router.push(`/auth/signin`);
      }
    };

    if (mounted && props.resetPasswordOTP) finalizePasswordRest();
    return () => (mounted = false);
  }, [props.resetPasswordOTP, userData.otp]);

  const handleChange = async (value, id) => {
    setUserData({ ...userData, [id]: value });

    if (validate(id, value)) {
      setInvalidInput({ ...invalidInput, [id]: false });
    } else {
      setInvalidInput({ ...invalidInput, [id]: true });
      enqueueSnackbar(errorMessages[id], { variant: "error" });
    }
  };

  const sendOTPHandler = async () => {
    if (!loading) {
      setLoading(true);

      if (userData.email && userData.handle && userData.password) {
        for (const [key, val] of Object.entries(invalidInput)) {
          if (val) return enqueueSnackbar(errorMessages[key], { variant: "error" });
        }
        resetPasswordOTPSenderAction({ ...userData });
      } else {
        for (const [key, val] of Object.entries(invalidInput)) {
          if (val) return enqueueSnackbar(errorMessages[key], { variant: "error" });
        }

        enqueueSnackbar("Please, fill all fields correctly", { variant: "error" });
      }
    }
    await sleep(2);
    setLoading(false);
  };

  return <Reset {...{ invalidInput, userData, handleChange, setShowPassword, showPassword, classes, loading, sendOTPHandler }} />;
};

const mapStateToProps = (state) => ({
  auth: state.profile.auth,
  resetPasswordOTP: state.profile.resetPasswordOTP,
});

const mapDispatchToProps = {
  resetPasswordAction,
  setAuthSlideTextAction,
  resetPasswordOTPSenderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetContainer);
