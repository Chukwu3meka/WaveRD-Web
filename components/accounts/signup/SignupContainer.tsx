"use client";

import validator from "utils/validator";
import accountsService from "services/accounts.service";

import { AxiosError } from "axios";
import { Signup, Success } from "./";
import { useSnackbar } from "notistack";
import { capitalize } from "@mui/material";
import { FocusEvent, useState } from "react";
import { getSystemTheme } from "utils/helpers";
import { INIT_PROFILE } from "utils/constants";
import { ApiResponse } from "interfaces/services/shared.interface";
import { ExistsPayload, SignupPayload } from "interfaces/services/accounts.interface";
import { SigninFormKeys, SignupForm } from "interfaces/components/accounts.interfaces";

const initUserForm: SignupForm = {
  email: { value: "", valid: true, info: "Email cannot be empty" },
  name: { value: "", valid: true, info: "Full Name cannot be empty" },
  options: { showPassword: false, loading: false, accountCreated: false },
  handle: { value: "", valid: true, info: "Handle cannot be empty", validating: false },
  password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
};

const SignupContainer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(),
    [userForm, setUserForm] = useState<SignupForm>(initUserForm);

  const registerHandler = async (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      setUserForm((values: SignupForm) => ({ ...values, options: { ...values.options, loading: true } }));

      /* re-validate all values before registeration */
      const userData: SignupPayload = { email: "", name: "", handle: "", password: "", theme: INIT_PROFILE.theme };
      for (const [tempId, { value, valid, info: message }] of Object.entries(userForm)) {
        const id = tempId as SigninFormKeys;

        if (id !== "options") {
          if (!valid) throw { message };
          userData[id] = value; // <= append input to userdata if its valid
        }
      }

      // get current system theme
      const theme = getSystemTheme();
      userData.theme = theme;

      await accountsService
        .signup(userData)
        .then(async () => {
          closeSnackbar(); // <= hide any error that have been shown previously
          setUserForm({ ...initUserForm, options: { ...initUserForm.options, accountCreated: true } });
        })
        .catch(({ response }: AxiosError<ApiResponse<string>>) => {
          throw { message: response ? response.data.message : "Invalid Email/Password" };
        })
        .catch((err: AxiosError) => {
          throw err.response?.data || {};
        });
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
    } finally {
      setUserForm((values) => ({ ...values, options: { ...values.options, loading: false } }));
    }
  };

  const onChangeHandler = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    const tempValue = e.target.value,
      id = e.target.id as SigninFormKeys,
      value = onBlur ? tempValue.trim() : tempValue;

    if (id === "options") return;

    // ? Don't revalidate input if user has not made change to previous value
    if (onBlur && userForm[id].value) {
      // ?  Notify user if onBlur when there's an error with the value
      if (!userForm[id].valid) return enqueueSnackbar(userForm[id].info, { variant: "error" });

      return; // <= terminate parent function execution
    }

    setUserForm((values) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));

    try {
      validator({ value: value, type: id, label: id === "email" ? "Email Address" : null });

      if (["handle", "email"].includes(id)) {
        setUserForm((values) => ({
          ...values,
          [id]: { ...values[id], valid: false, info: `Validating ${capitalize(id)}`, validating: true },
        }));

        await accountsService
          .exists({ data: value, variant: id as ExistsPayload["variant"] })
          .then(async ({ data: { exists } }) => {
            if (exists) throw { message: `${capitalize(id)} not available, Kindly use a different ${capitalize(id)}` };
            setUserForm((values) => ({ ...values, [id]: { ...values[id], valid: true, info: null, validating: false } }));
          })
          .catch(({ response }: AxiosError<ApiResponse<string>>) => {
            const message = response ? response.data.message : "An error occurred";
            setUserForm((values) => ({ ...values, [id]: { valid: false, info: message, validating: false } }));
          });
      } else {
        setUserForm((values) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
      }

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (onBlur) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values) => ({
        ...values,
        [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false },
      }));
    }
  };

  const handleClickShowPassword = () => {
    setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));
  };

  return userForm.options.accountCreated ? <Success /> : <Signup {...{ onChangeHandler, userForm, handleClickShowPassword, registerHandler }} />;
};

export default SignupContainer;
