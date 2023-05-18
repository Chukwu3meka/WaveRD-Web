import fetcher from "@utils/fetcher";
import validator from "@utils/validator";
import { sleep } from "@utils/handlers";

import { Validator } from "@interface/utils/validatorInterface";
import { OnInputChange, DeleteDataHandler } from "@interface/components/info/dataDeletion";

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

export const deleteDataHandler = async ({ enqueueSnackbar, setUserForm, userForm }: DeleteDataHandler) => {
  try {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = {};

    /* re-validate all values before registeration */
    for (const [id, { value, validate }] of Object.entries(userForm)) {
      if (validate) {
        validator({ value: value.trim(), type: <Validator["type"]>id, label: id === "email" ? "Email Address" : null });
        setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
        userData[id] = value.trim(); // <= append input to userdata if its valid
      }
    }

    // await fetcher({ method: "POST", payload: userData, endpoint: "/console/contact-us" }).then(async () => {
    await fetcher({ method: "POST", payload: userData, endpoint: "/accounts/data-deletion" }).then(async () => {
      await sleep(0.3);

      setUserForm({
        options: { showPassword: false, loading: false, validate: false },
        email: { value: "", valid: true, info: "Email cannot be empty", validate: true },
        handle: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
        comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
        password: { value: "", valid: true, info: "Password cannot be empty", validate: true },
      });

      enqueueSnackbar("Data deletion initiated, Kindly check your mail for the next step", { variant: "success" }); // <=  Inform user of regex error
    });
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error initiating account deletion", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  }
};
