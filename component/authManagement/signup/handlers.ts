import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

// e: React.FocusEvent<HTMLInputElement>, setValues: Function, setFormStatus: Function)
export const onInputChange = async ({ e, setValues, setFormStatus, setCurrentError }: any) => {
  const { value, id } = e.target;

  setValues((values: any) => ({ ...values, [id]: value }));
  setFormStatus((values: any) => ({ ...values, [id]: { ...values[id], pristine: false, status: "loading" } })); // <= set component state to loading
  try {
    validator({ value, type: id, label: id === "email" ? "Email Address" : null });

    if (["handle", "email"].includes(id)) {
      // Set loading for thess IDs
      setFormStatus((values: any) => ({ ...values, [id]: { status: "loading", pristine: false, message: null } }));

      // document.cookie = "key=value; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
      document.cookie = "key=value; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; domain=localhost:3000";

      await fetcher({ api: "accounts", endpoint: `/personal/${id}_exists`, method: "POST", payload: { [id]: value } })
        .then(async ({ payload: { exists } }) => {
          setFormStatus((values: any) => ({
            ...values,
            [id]: {
              pristine: false,
              status: exists ? "invalid" : "valid",
              message: exists ? `${id} already in use, Kindly use something different` : null,
            },
          }));
          setCurrentError(exists ? `${id} already in use, Kindly use something different` : null);
        })
        .catch(({ message }) => {
          setFormStatus((values: any) => ({ ...values, [id]: { status: "invalid", pristine: false, message: message || `Unable to validate ${id}` } }));
          setCurrentError(message || `Unable to validate ${id}`);
        });
    } else {
      setCurrentError(null);
      setFormStatus((values: any) => ({ ...values, [id]: { status: "valid", pristine: false, message: null } }));
    }
  } catch ({ message }) {
    setCurrentError(message);
    setFormStatus((values: any) => ({ ...values, [id]: { status: "invalid", pristine: false, message: message } }));
  }
};

export const registerHandler = async ({ setValues, values, formStatus, enqueueSnackbar, setCurrentError }: any) => {
  const formErrorArray: any = Object.values(formStatus);

  const notPristineAndValid = formErrorArray.every((x: any) => !x.pristine && x.status === "valid");

  setValues((values: any) => ({ ...values, buttonLoading: true })); // activate botton loading

  if (notPristineAndValid) {
    const { email, handle, password, fullName } = values;

    await fetcher({
      api: "accounts",
      method: "POST",
      endpoint: "/personal/add_account",
      payload: { email, handle, password, fullName },
    })
      .then(() => setValues((values: any) => ({ ...values, accountCreated: true })))
      .catch(() => setValues((values: any) => ({ ...values, accountCreated: false })))
      .finally(() => setValues((values: any) => ({ ...values, buttonLoading: false }))); // deactivate botton loading
  } else {
    const invalidEntry = formErrorArray.filter((x: any) => x.message)[0]["message"]; // ? cannot return undefined since it's notPristineAndValid
    setCurrentError(invalidEntry);

    enqueueSnackbar("Kindly correct the mistakes in the registration form", { variant: "error" }); // <=  Inform user of regex error
    await sleep(0.2);
    setValues((values: any) => ({ ...values, buttonLoading: false })); // deactivate botton loading
  }
};

export const onBlurHandler = async ({ e, setValues, setFormStatus, setCurrentError }: any) => {
  e.target.value = e.target.value.trim(); // trim empty spaces
  await onInputChange({ e, setValues, setFormStatus, setCurrentError });
};
