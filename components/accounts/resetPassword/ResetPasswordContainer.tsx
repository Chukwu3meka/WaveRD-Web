import { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ResetPassword, InvalidLink } from ".";

import validator from "utils/validator";
import { ResetForm, ResetFormKeys } from "interfaces/components/accounts.interfaces";

export default () => {
  const router = useRouter(),
    gear = (router.query.gear as string) || "", //  gear in reset email
    { enqueueSnackbar, closeSnackbar } = useSnackbar();

  if (!gear) return <InvalidLink />;

  const [form, setForm] = useState<ResetForm>({
    options: { showPassword: false, loading: false },
    email: { value: "", valid: true, info: "Email cannot be empty" },
    password: { value: "", valid: true, info: "Password cannot be empty" },
  });

  const handleClickShowPassword = () => setForm((values: any) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value, id: tempId } = e.target;
    const id = tempId as ResetFormKeys;

    if (id === "options") return;

    setForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
    try {
      validator({ value: value.trim(), type: id, label: id === "email" ? "Email Address" : null });

      setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}` } }));
    }
  };

  // const resetPasswordHandler = () => handlers.resetPasswordHandler({ enqueueSnackbar, setForm, form, gear });
  const resetPasswordHandler = async () => {
    try {
      setForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

      const userData: any = { gear };

      /* re-validate all values before registeration */
      for (const [tempId, { value }] of Object.entries(form)) {
        const id = tempId as ResetFormKeys;

        if (id !== "options") {
          validator({ value: value.trim(), type: id, label: id === "email" ? "Email Address" : null });
          setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
          userData[id] = value.trim(); // <= append input to userdata if its valid
        }
      }

      // await fetcher({ method: "POST", data: userData, endpoint: "/accounts/reset-password" }).then(async () => {
      //   await sleep(0.3);
      //   enqueueSnackbar("Password reset successfully, You can now login with the new password", { variant: "success" });
      //   setForm({
      //     email: { value: "", valid: true, info: "Email cannot be empty" },
      //     options: { showPassword: false, loading: false, accountCreated: false },
      //     password: { value: "", valid: true, info: "Password cannot be empty",  },
      //   });
      // });
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
    } finally {
      setForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
    }
  };

  return <ResetPassword onInputChange={onInputChange} form={form} resetPasswordHandler={resetPasswordHandler} handleClickShowPassword={handleClickShowPassword} />;
};
