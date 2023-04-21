import fetcher from "@utils/fetcher";
import { capitalize, sleep } from "@utils/handlers";
import validator from "@utils/validator";
import { IValidator } from "@interface/utils/validator-interface";
import { IOnInputChange, IRegisterHandler, IValidateFormEntry } from "@interface/accounts/signup-interface";

export const onInputChange = async ({ e, setUserForm, enqueueSnackbar, closeSnackbar }: IOnInputChange) => {
  const { value, id } = e.target;

  setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
  try {
    validator({ value: value.trim(), type: <IValidator["type"]>id, label: id === "email" ? "Email Address" : null });

    if (["handle", "email"].includes(id)) {
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null, validating: true } }));

      await fetcher({ api: "srv-accounts", endpoint: `/personal/${id}_exists`, method: "POST", payload: { [id]: value } }).then(
        async ({ payload: { exists } }) => {
          if (exists) throw { message: `${capitalize(id)} not available, Kindly use something different` };
          setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null, validating: false } }));
        }
      );
    } else {
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
    }

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
  }
};

export const registerHandler = async ({ enqueueSnackbar, setUserForm, userForm, closeSnackbar }: IRegisterHandler) => {
  try {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = {};

    /* re-validate all values before registeration */
    for (const [id, { value }] of Object.entries(userForm)) {
      if (id !== "options") {
        validator({ value: value.trim(), type: <IValidator["type"]>id, label: id === "email" ? "Email Address" : null });
        setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
        userData[id] = value.trim(); // <= append input to userdata if its valid
      }
    }

    await fetcher({ method: "POST", api: "srv-accounts", payload: userData, endpoint: "/personal/add_account" }).then(() =>
      setUserForm((values: any) => ({ ...values, options: { ...values.options, accountCreated: true } }))
    );

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    if (process.env.NODE_ENV === "development") await sleep(0.2);
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  }
};
