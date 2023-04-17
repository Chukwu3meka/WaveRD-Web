import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";
import { IValidator } from "@interface/utils/validator-interface";
import { IOnInputChange, IRegisterHandler, IValidateFormEntry } from "@interface/auth/signup-interface";

const validateFormEntry = async ({ id, value, setUserForm }: IValidateFormEntry) => {
  validator({ value, type: id, label: id === "email" ? "Email Address" : null });

  if (["handle", "email"].includes(id)) {
    await fetcher({ api: "srv-accounts", endpoint: `/personal/${id}_exists`, method: "POST", payload: { [id]: value } })
      .then(async ({ payload: { exists } }) => {
        if (exists) throw { message: `${id} already in use, Kindly use something different` };

        setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
      })
      .catch(({ message }) => {
        throw { message: message || `Unable to validate ${id}` };
      });
  } else {
    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
  }
};

export const onInputChange = async ({ e, setUserForm, enqueueSnackbar, closeSnackbar }: IOnInputChange) => {
  const { value, id } = e.target;

  setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
  try {
    validator({ value, type: <IValidator["type"]>id, label: id === "email" ? "Email Address" : null });

    if (["handle", "email"].includes(id)) {
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null, validating: true } }));

      await fetcher({ api: "srv-accounts", endpoint: `/personal/${id}_exists`, method: "POST", payload: { [id]: value } }).then(
        async ({ payload: { exists } }) => {
          if (exists) throw { message: `${id} already in use, Kindly use something different` };
          setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null, validating: false } }));
        }
      );
    } else {
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
    }

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
  }
};

export const registerHandler = async ({ enqueueSnackbar, setUserForm, userForm, closeSnackbar }: IRegisterHandler) => {
  try {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = {};

    for (const [key, { value }] of Object.entries(userForm)) {
      // <= re-validate all values before registeration
      if (key !== "options") await validateFormEntry({ id: <IValidator["type"]>key, value, setUserForm }).then(() => (userData[key] = value));
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
