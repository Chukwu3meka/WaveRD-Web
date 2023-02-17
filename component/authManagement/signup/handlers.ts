import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

// e: React.FocusEvent<HTMLInputElement>, setValues: Function, setFormStatus: Function)
export const onInputChange = async ({ e, setValues, setFormStatus, setCurrentError }: any) => {
  const { value, id } = e.target;

  setValues((values: any) => ({ ...values, [id]: id === "email" ? value : value.toLowerCase() }));
  setFormStatus((values: any) => ({ ...values, [id]: { ...values[id], pristine: false, status: "loading" } })); // <= set component state to loading
  try {
    validator({ value, type: id, label: id === "email" ? "Email Address" : null });

    if (["handle", "email"].includes(id)) {
      setFormStatus((values: any) => ({ ...values, [id]: { status: "loading", pristine: false, message: null } }));
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

  console.log({ formStatus });

  const notPristineAndValid = formErrorArray.every((x: any) => !x.pristine && x.status === "valid");

  console.log({ notPristineAndValid });

  setValues((values: any) => ({ ...values, buttonLoading: true })); // activate botton loading

  if (notPristineAndValid) {
    console.log(1, { values });

    const { email, handle, password, fullName } = values;

    console.log({ email, handle, password, fullName });

    await fetcher({
      api: "accounts",
      method: "POST",
      endpoint: "/personal/add_account",
      payload: { email, handle, password, fullName },
    })
      .then(() => setValues((values: any) => ({ ...values, accountCreated: true })))
      .catch((e) => {
        console.log(e);
        setValues((values: any) => ({ ...values, accountCreated: false }));
      })
      .finally(() => setValues((values: any) => ({ ...values, buttonLoading: false }))); // deactivate botton loading
  } else {
    console.log(2, { values, formErrorArray });
    console.log(formErrorArray.filter((x: any) => x.message));
    console.log(formErrorArray.filter((x: any) => x.message)[0]);
    console.log(formErrorArray.filter((x: any) => x.message)[0]["message"]);

    const invalidEntry = formErrorArray.filter((x: any) => x.message)[0]["message"]; // ? cannot return undefined since it's notPristineAndValid

    console.log({ invalidEntry });

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
