"use client";

import { AxiosError } from "axios";
import { sleep } from "utils/helpers";
import { useSnackbar } from "notistack";
import validator from "utils/validator";
import { FocusEvent, useState } from "react";
import { GEAR_LENGTH } from "utils/constants";
import { ResetPassword, InvalidLink } from ".";
import { confPassResetService } from "services/accounts.service";

import { ConfirmPasswordResetContainerProps, ResetForm, ResetFormKeys } from "interfaces/components/accounts.interfaces";

const INIT_FORM: ResetForm = {
  options: { showPassword: false, loading: false },
  email: { value: "", valid: true, info: "Email cannot be empty" },
  password: { value: "", valid: true, info: "Password cannot be empty" },
};

const ConfirmPasswordResetContainer = ({ gear }: ConfirmPasswordResetContainerProps) => {
  if (!gear) return <InvalidLink />;

  const [form, setForm] = useState<ResetForm>(INIT_FORM),
    { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setForm((values: any) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    const { value: tempValue, id: tempId } = e.target,
      id = tempId as ResetFormKeys,
      value = onBlur ? tempValue.trim() : tempValue;

    if (id === "options") return;

    setForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
    try {
      validator({ value: value, type: id, label: id === "email" ? "Email Address" : null });

      setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (value && onBlur) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}` } }));
    }
  };

  const resetPasswordHandler = async (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      setForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

      if (gear.length !== GEAR_LENGTH) {
        await sleep(0.5);
        setForm(INIT_FORM);
        throw { message: "Password Reset Link Might Have Expired or Is Invalid" };
      }

      const userData: any = { gear };

      /* re-validate all values before registeration */
      for (const [tempId, { value }] of Object.entries(form)) {
        const id = tempId as ResetFormKeys;

        if (id !== "options") {
          validator({ value: value, type: id, label: id === "email" ? "Email Address" : null });
          setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
          userData[id] = value; // <= append input to userdata if its valid
        }
      }

      await confPassResetService(userData)
        .then(async () => {
          enqueueSnackbar("Password reset successfully, You can now login with the new password", { variant: "success" });
          setForm(INIT_FORM);
        })
        .catch((err: AxiosError) => {
          throw err.response?.data || {};
        });
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
    } finally {
      setForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
    }
  };

  return <ResetPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} handleClickShowPassword={handleClickShowPassword} />;
};

export default ConfirmPasswordResetContainer;
