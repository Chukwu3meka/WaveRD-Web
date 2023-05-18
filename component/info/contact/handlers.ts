import fetcher from "@utils/fetcher";
import validator from "@utils/validator";
import { sleep } from "@utils/handlers";

import { Validator } from "@interface/utils/validatorInterface";
import { OnInputChange, ContactPrefHandler, SubmitHandler } from "@interface/components/info/contactUs";

export const contactPrefHandler = ({ e, userForm, contactPreference, setUserForm, enqueueSnackbar, closeSnackbar }: ContactPrefHandler) => {
  const preference: string = e.target.value;
  setUserForm((values) => ({ ...values, options: { ...values.options, contact: preference } }));
  try {
    validator({ value: userForm.contact.value.trim(), type: <Validator["type"]>preference, label: contactPreference[preference] });
    setUserForm((values) => ({ ...values, contact: { ...values.contact, valid: true } }));
    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }) {
    enqueueSnackbar(message || "Contact is invalid", { variant: "error" }); // <=  Inform user of regex error
    setUserForm((values) => ({ ...values, contact: { ...values.contact, valid: false } }));
  }
};

export const onInputChange = async ({ e, contactPreference, setUserForm, enqueueSnackbar, userForm, closeSnackbar, onBlur }: OnInputChange) => {
  const { value, id } = e.target;

  const validatorId = id === "contact" ? userForm.options.contact : id;

  setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
  try {
    validator({ value: value.trim(), type: <Validator["type"]>validatorId, label: validatorId !== id ? contactPreference[validatorId] : null });

    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));

    closeSnackbar(); // <= hide any error that have been shown previously
  } catch ({ message }: any) {
    if (onBlur) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
  }
};

export const submitHandler = async ({ enqueueSnackbar, setUserForm, userForm, contactPreference, categories }: SubmitHandler) => {
  try {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const userData: any = {
      category: userForm.options.category,
      preference: userForm.options.contact,
    };

    /* re-validate all values before registeration */
    for (const [id, { value, validate }] of Object.entries(userForm)) {
      if (validate) {
        const validatorId = id === "contact" ? userForm.options.contact : id;
        // maduekwepedro@gmail.com
        validator({ value: value.trim(), type: <Validator["type"]>validatorId, label: validatorId !== id ? contactPreference[validatorId] : null });
        setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
        userData[id] = value.trim(); // <= append input to userdata if its valid
      }
    }

    // // await fetcher({ method: "POST", payload: userData, endpoint: "/console/contact-us" }).then(async () => {
    await fetcher({ method: "POST", payload: userData, endpoint: "/console/contact-us" }).then(async () => {
      await sleep(0.3);

      setUserForm({
        name: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
        contact: { value: "", valid: true, info: "Contact cannot be empty", validate: true },
        comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
        options: { loading: false, contact: "email", validate: false, category: categories[0].value },
      });

      enqueueSnackbar("Message sent successfully, We'll get in touch soon", { variant: "success" }); // <=  Inform user of regex error
    });
  } catch ({ message }: any) {
    enqueueSnackbar(message || "Error initiating account deletion", { variant: "error" }); // <=  Inform user of regex error
  } finally {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  }
};
