import validator from "@utils/validator";

export const onInputChange = (e: React.FocusEvent<HTMLInputElement>, setValues: Function, setFormError: Function) => {
  const { value, id } = e.target;
  setValues((values: any) => ({ ...values, [id]: value }));

  setFormError((values: any) => ({ ...values, [id]: { ...values[id], pristine: false, status: "loading" } })); // <= set component state to loading
  try {
    validator({ value, type: id as "email" | "password", label: id === "email" ? "Email Address" : "password" });
    setFormError((values: any) => ({ ...values, [id]: { status: "valid", pristine: false, message: null } }));
  } catch ({ message }) {
    console.log("222dsfdf");
    setFormError((values: any) => ({ ...values, [id]: { status: "invalid", pristine: false, message: message } }));
  }
};

export const registerHandler = (): any => {
  console.log("registerHandler");
};
