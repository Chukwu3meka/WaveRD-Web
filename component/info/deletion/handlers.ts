import fetcher from "@utils/fetcher";
import validator from "@utils/validator";
import { capitalize, sleep } from "@utils/handlers";

import { Validator } from "@interface/utils/validatorInterface";
import { OnInputChange, RegisterHandler } from "@interface/components/accounts/signupInterface";

export const onInputChange = async ({ e, setUserForm, enqueueSnackbar, closeSnackbar, onBlur }: OnInputChange) => {
  const { value, id } = e.target;

  setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
  try {
    validator({ value: value.trim(), type: <Validator["type"]>id, label: id === "email" ? "Email Address" : null });

    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    if (onBlur) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
  }
};

export const registerHandler = async ({ enqueueSnackbar, setUserForm, userForm, closeSnackbar }: RegisterHandler) => {
  try {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = {};

    /* re-validate all values before registeration */
    for (const [id, { value }] of Object.entries(userForm)) {
      if (id !== "options") {
        validator({ value: value.trim(), type: <Validator["type"]>id, label: id === "email" ? "Email Address" : null });
        setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
        userData[id] = value.trim(); // <= append input to userdata if its valid
      }
    }

    await fetcher({ method: "POST", payload: userData, endpoint: "/accounts/signup" }).then(async () => {
      await sleep(0.5);
      setUserForm((values: any) => ({ ...values, options: { ...values.options, accountCreated: true } }));
    });

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  }
};
