import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";
import { IValidator } from "@interface/utils/validator-interface";
import { IOnInputChange, IRegisterHandler, IValidateFormEntry } from "@interface/auth/signup-interface";

const validateFormEntry = async ({ id, value, setUserForm }: IValidateFormEntry) => {
  validator({ value, type: id, label: id === "email" ? "Email Address" : null });

  if (["handle", "email"].includes(id)) {
    await fetcher({ api: "accounts", endpoint: `/personal/${id}_exists`, method: "POST", payload: { [id]: value } })
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

export const onInputChange = async ({ e, setUserForm }: IOnInputChange) => {
  const { value, id } = e.target;

  setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
  try {
    validator({ value, type: <IValidator["type"]>id, label: id === "email" ? "Email Address" : null });

    if (["handle", "email"].includes(id)) {
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));

      await fetcher({ api: "accounts", endpoint: `/personal/${id}_exists`, method: "POST", payload: { [id]: value } })
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
  } catch ({ message }: any) {
    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message } }));
  }
};

export const registerHandler = async ({ enqueueSnackbar, setUserForm, userForm }: IRegisterHandler) => {
  try {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = {};

    // re-validate all values before registeration
    for (const [key, { value }] of Object.entries(userForm)) {
      if (key !== "options") await validateFormEntry({ id: <IValidator["type"]>key, value, setUserForm }).then(() => (userData[key] = value));
    }

    await fetcher({ method: "POST", api: "accounts", payload: userData, endpoint: "/personal/add_account" }).then(() =>
      setUserForm((values: any) => ({ ...values, options: { ...values.options, accountCreated: true } }))
    );
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    if (process.env.NODE_ENV === "development") await sleep(0.2);
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  }
};

export const onBlurHandler = async ({ e, setUserForm }: any) => {
  e.target.value = e.target.value.trim(); // trim empty spaces
  await onInputChange({ e, setUserForm });
};
