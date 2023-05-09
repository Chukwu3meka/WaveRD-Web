import fetcher from "@utils/fetcher";
import validator from "@utils/validator";
import { capitalize, sleep } from "@utils/handlers";

import { LoginHandler, IOnInputChange } from "@interface/accounts/signin-interface";

export const loginHandler = async ({ setUserForm, userForm, enqueueSnackbar, setAuthAction }: LoginHandler) => {
  for (const value of ["email", "password"]) if (!userForm[value].trim()) return enqueueSnackbar(`${capitalize(value)} cannot be empty`, { variant: "error" });

  setUserForm((userForm: any) => ({ ...userForm, buttonLoading: true })); // activate botton loading

  const email = userForm.email.trim(),
    password = userForm.password;

  try {
    validator({ value: email, type: "email" });
    validator({ value: password, type: "password" });
  } catch (error) {
    await sleep(0.2);
    setUserForm((userForm: any) => ({ ...userForm, buttonLoading: false })); // deactivate botton loading
    return enqueueSnackbar("Invalid Email/Password", { variant: "error" }); // <=  Don't inform user of regex error
  }

  await fetcher({ method: "POST", endpoint: "/accounts/signin", payload: { email, password } })
    .then(async ({ payload: { role, fullName, handle, cookieConsent } }) => {
      await sleep(1);
      setAuthAction({ role, fullName, handle, cookieConsent });
      enqueueSnackbar("Authenticated Successfully", { variant: "success" });
    })
    .catch(({ message }) => enqueueSnackbar(message || "Invalid Email/Password", { variant: "error" }))
    .finally(() => setUserForm((userForm: any) => ({ ...userForm, buttonLoading: false }))); // deactivate botton loading
};

export const onInputChange = async ({ e, setUserForm }: IOnInputChange) => {
  const { value, id } = e.target;
  setUserForm((userForm: any) => ({ ...userForm, [id]: value }));
};

export const onBlurHandler = async ({ e, setUserForm }: IOnInputChange) => {
  e.target.value = e.target.value.trim(); // trim empty spaces
  await onInputChange({ e, setUserForm });
};

// export const oAuthLoginFn = async ({ e, setUserForm }: IOnInputChange) => {
