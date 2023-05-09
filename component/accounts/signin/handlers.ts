import fetcher from "@utils/fetcher";
import validator from "@utils/validator";
import { capitalize, sleep } from "@utils/handlers";

import { LoginHandler, IOnInputChange } from "@interface/accounts/signin-interface";

export const loginHandler = async ({ setUserForm, userForm, enqueueSnackbar, setAuthAction }: LoginHandler) => {
  for (const value of ["email", "password"]) if (!userForm[value].trim()) return enqueueSnackbar(`${capitalize(value)} cannot be empty`, { variant: "error" });

  setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

  const disableLoading = () => setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));

  const email = userForm.email.trim(),
    password = userForm.password;

  try {
    validator({ value: email, type: "email" });
    validator({ value: password, type: "password" });
  } catch (error) {
    await sleep(0.2);
    disableLoading();
    enqueueSnackbar("Invalid Email/Password", { variant: "error" }); // <=  Don't inform user of regex error
    return;
  }

  await fetcher({ method: "POST", endpoint: "/accounts/signin", payload: { email, password } })
    .then(async ({ payload: { role, fullName, handle, cookieConsent } }) => {
      await sleep(0.5);
      setAuthAction({ role, fullName, handle, cookieConsent });
      enqueueSnackbar("Authenticated Successfully", { variant: "success" });
    })
    .catch(async ({ message }) => {
      await sleep(0.5);
      enqueueSnackbar(message || "Invalid Email/Password", { variant: "error" });
    })
    .finally(() => disableLoading());
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
