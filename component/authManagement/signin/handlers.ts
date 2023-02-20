import { ILoginHandler } from "@interface/auth/signin-interface";
import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

export const loginHandler = async ({ setValues, values, enqueueSnackbar, setAuthAction }: ILoginHandler) => {
  setValues((values: any) => ({ ...values, buttonLoading: true })); // activate botton loading

  const email = values.email.trim();
  const password = values.password.trim();

  try {
    validator({ value: email, type: "email" });
    validator({ value: password, type: "password" });
  } catch (error) {
    await sleep(0.2);
    setValues((values: any) => ({ ...values, buttonLoading: false })); // deactivate botton loading
    return enqueueSnackbar("Invalid Email/Password", { variant: "error" }); // <=  Don't inform user of regex error
  }

  await fetcher({
    api: "accounts",
    method: "POST",
    endpoint: "/personal/auth",
    payload: { email, password },
  })
    .then(({ payload: { role, fullName, handle } }) => {
      setAuthAction({ role, fullName, handle });
      enqueueSnackbar("Authenticated Successfully", { variant: "success" });
    })
    .catch(({ message }) => enqueueSnackbar(message || "Invalid Email/Password", { variant: "error" }))
    .finally(() => setValues((values: any) => ({ ...values, buttonLoading: false }))); // deactivate botton loading
};

export const onInputChange = (e: React.FocusEvent<HTMLInputElement>, setValues: Function) => {
  const { value, id } = e.target;
  setValues((values: any) => ({ ...values, [id]: value }));
};
