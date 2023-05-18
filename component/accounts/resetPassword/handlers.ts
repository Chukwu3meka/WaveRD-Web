import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

import { Validator } from "@interface/utils/validatorInterface";
import { ResetPasswordHandler, ResetPasswordOnInputChange } from "@interface/components/accounts/resetPasswordInterface";

export const onInputChange = async ({ e, setForm, enqueueSnackbar, closeSnackbar }: ResetPasswordOnInputChange) => {
  const { value, id } = e.target;

  setForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
  try {
    validator({ value: value.trim(), type: <Validator["type"]>id, label: id === "email" ? "Email Address" : null });

    setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
    setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
  }
};

export const resetPasswordHandler = async ({ enqueueSnackbar, setForm, form, gear }: ResetPasswordHandler) => {
  try {
    setForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = { gear };

    /* re-validate all values before registeration */
    for (const [id, { value }] of Object.entries(form)) {
      if (id !== "options") {
        validator({ value: value.trim(), type: <Validator["type"]>id, label: id === "email" ? "Email Address" : null });
        setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
        userData[id] = value.trim(); // <= append input to userdata if its valid
      }
    }

    await fetcher({ method: "POST", payload: userData, endpoint: "/accounts/reset-password" }).then(async () => {
      await sleep(0.3);
      enqueueSnackbar("Password reset successfully, You can now login with the new password", { variant: "success" });
      setForm({
        email: { value: "", valid: true, info: "Email cannot be empty" },
        options: { showPassword: false, loading: false, accountCreated: false },
        password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
      });
    });
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    setForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  }
};
