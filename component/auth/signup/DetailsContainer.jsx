import { useState } from "react";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";

import { Details } from ".";
import validate from "@utils/validator";
import { sleep } from "@utils/clientFuncs";
import { isEmailTaken } from "@utils/serverFetch";

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

const DetailsContainer = (props) => {
  const classes = useStyles(),
    { values, setValues } = props,
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [invalidInput, setInvalidInput] = useState({}),
    { handle, password, email } = values,
    [showPassword, setShowPassword] = useState(false),
    errorMessages = {
      email: "Uhh, Email invalid or Unavailable",
      handle: "Handle should be readable and cannot be less than three letters",
      password: "Password cannot be less than 7 characters and must contain number(s) and letter(s).",
    };

  const handleChange = async (value, id, updateValue) => {
    setValues[updateValue](value);

    if (validate(id, value)) {
      if (id == "email") {
        const emailInUse = await isEmailTaken(value);
        if (emailInUse === "email taken") {
          setInvalidInput({ ...invalidInput, [id]: true });
          // enqueueSnackbar(errorMessages[id], { variant: "error" });
        } else {
          setInvalidInput({ ...invalidInput, [id]: false });
        }
      } else {
        setInvalidInput({ ...invalidInput, [id]: false });
      }
    } else {
      setInvalidInput({ ...invalidInput, [id]: true });
      // enqueueSnackbar(errorMessages[id], { variant: "error" });
    }
  };

  const proceed = async () => {
    if (!loading) {
      setLoading(true);
      await sleep(0.3);
      setLoading(false);

      if (email && handle && password) {
        for (const [key, val] of Object.entries(invalidInput)) {
          if (val) return enqueueSnackbar(errorMessages[key], { variant: "error" });
        }

        setValues.setStep(2);
      } else {
        for (const [key, val] of Object.entries(invalidInput)) {
          if (val) return enqueueSnackbar(errorMessages[key], { variant: "error" });
        }

        return enqueueSnackbar("Please, fill all fields correctly", { variant: "error" });
      }
    }
  };

  return (
    <Details
      {...{
        email,
        handle,
        classes,
        proceed,
        loading,
        password,
        handleChange,
        showPassword,
        invalidInput,
        setShowPassword,
      }}
    />
  );
};

export default DetailsContainer;
