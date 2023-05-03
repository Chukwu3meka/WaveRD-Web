import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";
import { ILoginHandler, IOnInputChange } from "@interface/accounts/signin-interface";

export const loginHandler = async ({ setUserForm, userForm, enqueueSnackbar, setAuthAction }: ILoginHandler) => {
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

  await fetcher({
    api: "srv-accounts",
    method: "POST",
    endpoint: "/accounts",
    payload: { email, password },
  })
    .then(({ payload: { role, fullName, handle } }) => {
      setAuthAction({ role, fullName, handle });
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
