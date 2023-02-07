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

    if (id === "email") {
      setFormStatus((values: any) => ({ ...values, [id]: { status: "loading", pristine: false, message: null } }));

      await fetcher({ api: "accounts", endpoint: "/personal/email_exists", method: "POST", payload: { email: value } })
        .then(async ({ payload: { exists } }) => {
          await sleep(0.5);
          setFormStatus((values: any) => ({
            ...values,
            [id]: {
              pristine: false,
              status: exists ? "invalid" : "valid",
              message: exists ? "Email already in use, Kindly use a different email address" : null,
            },
          }));
          setCurrentError(exists ? "Email already in use, Kindly use a different email address" : null);
        })
        .catch(({ message }) => {
          setFormStatus((values: any) => ({ ...values, [id]: { status: "invalid", pristine: false, message: message || "Unable to validate mail" } }));
          setCurrentError(message || "Unable to validate mail");
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
    console.log(notPristineAndValid);
    const { email, handle, password, fullName } = values;

    await fetcher({
      api: "accounts",
      endpoint: "/personal/add_account",
      method: "POST",
      payload: { email, handle, password, fullName },
    })
      .then(() => {
        //
        setValues((values: any) => ({ ...values, accountCreated: true }));
      })
      .catch(() => {
        //
        setValues((values: any) => ({ ...values, accountCreated: true }));
      })
      .finally(() => {
        setValues((values: any) => ({ ...values, buttonLoading: false })); // deactivate botton loading
      });
  } else {
    const invalidEntry = formErrorArray.filter((x: any) => x.message)[0]["message"]; // ? cannot return undefined since it's notPristineAndValid
    setCurrentError(invalidEntry);

    enqueueSnackbar("Kindly correct the mistakes in the registration form", { variant: "error" }); // <=  Inform user of regex error
    await sleep(0.2);
    setValues((values: any) => ({ ...values, buttonLoading: false })); // deactivate botton loading
  }
};
