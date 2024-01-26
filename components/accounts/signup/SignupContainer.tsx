import { useState } from "react";
import { Signup, Success } from ".";
import { useSnackbar } from "notistack";
import { SigninFormKeys, SignupForm } from "interfaces/components/accounts.interfaces";
import { Validator } from "interfaces/utils/validator.interface";
import validator from "utils/validator";
import { capitalize } from "@mui/material";
import { existsService, signupService } from "services/accounts.service";
import { existsPayload, signupPayload } from "interfaces/services/accounts.interface";
import { AxiosError } from "axios";
import { ApiResponse } from "interfaces/services/shared.interface";

const initUserForm: SignupForm = {
  email: { value: "", valid: true, info: "Email cannot be empty" },
  fullName: { value: "", valid: true, info: "Full Name cannot be empty" },
  options: { showPassword: false, loading: false, accountCreated: false },
  handle: { value: "", valid: true, info: "Handle cannot be empty", validating: false },
  password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
};

const SignupContainer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<SignupForm>(initUserForm);
  const registerHandler = async () => {
    try {
      setUserForm((values: SignupForm) => ({ ...values, options: { ...values.options, loading: true } }));

      const userData: signupPayload = {};

      /* re-validate all values before registeration */
      for (const [tempId, { value, valid, info: message }] of Object.entries(userForm)) {
        const id = tempId as SigninFormKeys;

        if (id !== "options") {
          if (!valid) throw { message };
          userData[id] = value.trim(); // <= append input to userdata if its valid
        }
      }

      await signupService(userData)
        .then(async () => {
          closeSnackbar(); // <= hide any error that have been shown previously
          setUserForm({ ...initUserForm, options: { ...initUserForm.options, accountCreated: true } });
        })
        .catch(({ response }: AxiosError<ApiResponse>) => {
          throw { message: response ? response.data.message : "Invalid Email/Password" };
        });
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
    } finally {
      setUserForm((values) => ({ ...values, options: { ...values.options, loading: false } }));
    }
  };

  const valueChangeFn = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    const { value, id: tempId } = e.target;
    const id = tempId as SigninFormKeys;

    if (id === "options") return;

    // ? Don't revalidate input if user has not made change to previous value
    if (onBlur && value.trim() === userForm[id].value) {
      // ?  Notify user if onBlur when there's an error with the value
      if (!userForm[id].valid) return enqueueSnackbar(userForm[id].info, { variant: "error" });

      return; // <= terminate parent function execution
    }

    setUserForm((values) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));

    try {
      validator({ value: value.trim(), type: id, label: id === "email" ? "Email Address" : null });

      if (["handle", "email"].includes(id)) {
        setUserForm((values) => ({ ...values, [id]: { ...values[id], valid: false, info: `Validating ${capitalize(id)}`, validating: true } }));

        await existsService({ data: value, variant: id as existsPayload["variant"] })
          .then(async ({ data: { exists } }) => {
            if (exists) throw { message: `${capitalize(id)} not available, Kindly use a different ${capitalize(id)}` };
            setUserForm((values) => ({ ...values, [id]: { ...values[id], valid: true, info: null, validating: false } }));
          })
          .catch(({ response }: AxiosError<ApiResponse>) => {
            const message = response ? response.data.message : "An error occurred";
            setUserForm((values) => ({ ...values, [id]: { valid: false, info: message, validating: false } }));
          });
      } else {
        setUserForm((values) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
      }

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (onBlur) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
    }
  };

  const onBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => valueChangeFn(e, true);
  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>) => valueChangeFn(e, false);

  const handleClickShowPassword = () => {
    setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));
  };

  return userForm.options.accountCreated ? <Success /> : <Signup {...{ onInputChange, userForm, handleClickShowPassword, registerHandler, onBlurHandler }} />;
};

export default SignupContainer;
