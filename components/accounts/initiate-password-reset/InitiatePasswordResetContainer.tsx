"use client";

import validator from "utils/validator";
import AccountsService from "services/accounts.service";

import { AxiosError } from "axios";
import { ForgotPassword } from ".";
import { useSnackbar } from "notistack";
import { FocusEvent, useState } from "react";
import { ForgotPasswordForm } from "interfaces/components/accounts.interfaces";

const InitiatePasswordResetContainer = () => {
  const accountsService = new AccountsService(),
    { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [form, setForm] = useState<ForgotPasswordForm>({
    options: { loading: false },
    email: { value: "", valid: true, info: "Email cannot be empty" },
  });

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    const { value: tempValue, id } = e.target,
      value = onBlur ? tempValue.trim() : tempValue;

    setForm((values: any) => ({ ...values, email: { ...values.email, value: value.toLowerCase() } }));
    try {
      validator({ value, type: "email", label: "Email Address" });

      setForm((values: any) => ({ ...values, email: { ...values["email"], valid: true, info: null } }));

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (value && onBlur) enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
      setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}` } }));
    }
  };

  const resetPasswordHandler = async (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const email = form.email.value;
      setForm((values: any) => ({ ...values, options: { loading: true } }));

      validator({ value: email, type: "email", label: "Email Address" }); // <= re-validate all values before registeration

      await accountsService
        .initPasswordReset({ email })
        .then(async () => {
          setForm((values: any) => ({ ...values, email: { value: "", valid: true, info: "Email cannot be empty" } }));
          enqueueSnackbar("Kindly check your email for password reset link", { variant: "success" }); // <=  Inform user of regex error
        })
        .catch((err: AxiosError) => {
          throw err.response?.data || {};
        });
    } catch ({ message }: any) {
      enqueueSnackbar(message || "An error occured", { variant: "error" }); // <=  Inform user of regex error
    } finally {
      setForm((values: any) => ({ ...values, options: { loading: false } }));
    }
  };

  return <ForgotPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} />;
};

export default InitiatePasswordResetContainer;
