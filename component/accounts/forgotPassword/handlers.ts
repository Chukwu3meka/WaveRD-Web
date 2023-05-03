import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

export const onInputChange = async ({ e, setForm, enqueueSnackbar, closeSnackbar }: any) => {
  const { value, id } = e.target;

  setForm((values: any) => ({ ...values, email: { ...values.email, value: value.toLowerCase() } }));
  try {
    validator({ value, type: "email", label: "Email Address" });

    setForm((values: any) => ({ ...values, email: { ...values["email"], valid: true, info: null, validating: true } }));

    await fetcher({ api: "srv-accounts", endpoint: `/${id}_exists`, method: "POST", payload: { email: value } }).then(async ({ payload: { exists } }) => {
      if (exists) throw { message: `Email not available, Kindly use something different` };
      setForm((values: any) => ({ ...values, email: { ...values["email"], valid: true, info: null, validating: false } }));
    });

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
    setForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
  }
};

export const resetPasswordHandler = async ({ enqueueSnackbar, setForm, form, closeSnackbar }: any) => {
  try {
    const email = form.email.value;
    setForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = {};

    validator({ value: email, type: "email", label: "Email Address" }); // <= re-validate all values before registeration

    await fetcher({ method: "POST", api: "srv-accounts", payload: userData, endpoint: "/forgot_password" }).then(() => {
      setForm({
        email: { value: "", valid: true, info: "Email cannot be empty" },
        options: { showPassword: false, loading: false, accountCreated: false },
      });
      closeSnackbar(); // <= hide any error that have been shown previously
      enqueueSnackbar("Kindly check your email for password reset link", { variant: "success" }); // <=  Inform user of regex error
    });
  } catch ({ message }: any) {
    enqueueSnackbar(message || "An error occured", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    if (process.env.NODE_ENV === "development") await sleep(0.2);
    setForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  }
};
