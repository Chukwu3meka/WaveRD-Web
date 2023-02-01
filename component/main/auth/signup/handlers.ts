import { sleep } from "@utils/handlers";
import validator from "@utils/validator";

export const onInputChange = (e: React.FocusEvent<HTMLInputElement>, setValues: Function, setFormError: Function) => {
  const { value, id } = e.target;
  setValues((values: any) => ({ ...values, [id]: value }));

  setFormError((values: any) => ({ ...values, [id]: { ...values[id], pristine: false, status: "loading" } })); // <= set component state to loading
  try {
    validator({ value, type: id as "email" | "password", label: id === "email" ? "Email Address" : "password" });
    setFormError((values: any) => ({ ...values, [id]: { status: "valid", pristine: false, message: null } }));
  } catch ({ message }) {
    setFormError((values: any) => ({ ...values, [id]: { status: "invalid", pristine: false, message: message } }));
  }
};

export const registerHandler = async ({ setValues, values, formError, enqueueSnackbar }: any) => {
  setValues((values: any) => ({ ...values, buttonLoading: false, accountCreated: true }));

  const formErrorArray = Object.values(formError);

  const notPristineAndValid = formErrorArray.every((x) => !x.pristine || x.status === "valid");

  setValues((values: any) => ({ ...values, buttonLoading: true })); // activate botton loading

  if (notPristineAndValid) {
    const { email, password } = values;
    setValues((values: any) => ({ ...values, buttonLoading: false, accountCreated: true })); // deactivate botton loading
  } else {
    const invalidEntry = formErrorArray.filter((x) => x.message)[0]["message"]; // ? cannot return undefined since it's notPristineAndValid

    // Inform user of regex error
    enqueueSnackbar(invalidEntry, { variant: "error" });
    await sleep(0.2);
    setValues((values: any) => ({ ...values, buttonLoading: false })); // deactivate botton loading
  }
};
