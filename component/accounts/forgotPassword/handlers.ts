import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

import { ForgotPasswordHandler, ForgotPasswordOnInputChange } from "@interface/components/accounts/forgotPasswordInterface";

export const onInputChange = async ({ e, setForm, enqueueSnackbar, closeSnackbar }: ForgotPasswordOnInputChange) => {
  const { value, id } = e.target;

  setForm((values: any) => ({ ...values, email: { ...values.email, value: value.toLowerCase() } }));
  try {
    validator({ value, type: "email", label: "Email Address" });

    setForm((values: any) => ({ ...values, email: { ...values["email"], valid: true, info: null } }));

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
    setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}` } }));
  }
};

export const resetPasswordHandler = async ({ enqueueSnackbar, setForm, form }: ForgotPasswordHandler) => {
  try {
    const email = form.email.value;
    setForm((values: any) => ({ ...values, options: { loading: true } }));

    validator({ value: email, type: "email", label: "Email Address" }); // <= re-validate all values before registeration

    await fetcher({ method: "POST", data: { email }, endpoint: "/accounts/forgot-password" }).then(async () => {
      await sleep(0.3);
      setForm((values: any) => ({ ...values, email: { value: "", valid: true, info: "Email cannot be empty" } }));
      enqueueSnackbar("Kindly check your email for password reset link", { variant: "success" }); // <=  Inform user of regex error
    });
  } catch ({ message }: any) {
    enqueueSnackbar(message || "An error occured", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    setForm((values: any) => ({ ...values, options: { loading: false } }));
  }
};
