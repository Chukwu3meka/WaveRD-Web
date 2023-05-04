import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

import { IValidator } from "@interface/utils/validator-interface";
import { ResetPasswordHandler, ResetPasswordOnInputChange } from "@interface/accounts/resetPassword-interface";

export const onInputChange = async ({ e, setForm, enqueueSnackbar, closeSnackbar }: ResetPasswordOnInputChange) => {
  const { value, id } = e.target;

  setForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
  try {
    validator({ value: value.trim(), type: <IValidator["type"]>id, label: id === "email" ? "Email Address" : null });

    setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
    setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
  }
};

export const resetPasswordHandler = async ({ enqueueSnackbar, setForm, form, gear, router }: ResetPasswordHandler) => {
  try {
    setForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = { gear };

    /* re-validate all values before registeration */
    for (const [id, { value }] of Object.entries(form)) {
      if (id !== "options") {
        validator({ value: value.trim(), type: <IValidator["type"]>id, label: id === "email" ? "Email Address" : null });
        setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
        userData[id] = value.trim(); // <= append input to userdata if its valid
      }
    }

    await fetcher({ method: "POST", api: "srv-accounts", payload: userData, endpoint: "/reset-password" }).then(() => {
      enqueueSnackbar("Password reset successfully, You can now login with the new password", { variant: "success" });
      setForm({
        email: { value: "", valid: true, info: "Email cannot be empty" },
        options: { showPassword: false, loading: false, accountCreated: false },
        password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
      });
      router.push("/accounts/signin");
    });
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    if (process.env.NODE_ENV === "development") await sleep(0.2);
    setForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  }
};
