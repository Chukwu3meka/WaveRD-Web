import { Contact,  } from ".";
import { useSnackbar } from "notistack";
import validator from "utils/validator";
import { useState, useRef } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { CONTACT_PREFERENCE, CONTACT_US_CATEGORIES } from "utils/constants";


import { Validator } from "interfaces/utils/validator.interface";



export default () => {
  const categoryRef = useRef(null),
    { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const sectionHandler = (value: string) => {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, category: value } }));
    setTimeout(() => categoryRef.current?.focus(), 100);
  };

  const [userForm, setUserForm] = useState<any>({
    name: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
    contact: { value: "", valid: true, info: "Contact cannot be empty", validate: true },
    comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
    options: { loading: false, contact: "email", validate: false, category: CONTACT_US_CATEGORIES[0].value },
  });

  const submitHandler = () => {
    try {
      setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));
  
      const userData: any = {
        category: userForm.options.category,
        preference: userForm.options.contact,
      };
  
      /* re-validate all values before registeration */
      for (const [id, { value, validate }] of Object.entries(userForm)) {


        // declare let id: 'contact' |"name"|"comment";

        
        if (validate&&id !== "options") {
          const validatorId = id === "contact" ? userForm.options.contact : id;
            validator({ value: value.trim(), type: <Validator["type"]>validatorId, label: validatorId !== id ? CONTACT_PREFERENCE[validatorId] : null });
          setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
          userData[id] = value.trim(); // <= append input to userdata if its valid
        }
      }
  
      // // await fetcher({ method: "POST", data: userData, endpoint: "/console/contact-us" }).then(async () => {
      await fetcher({ method: "POST", data: userData, endpoint: "/console/contact-us" }).then(async () => {
        await sleep(0.3);
  
        setUserForm({
          name: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
          contact: { value: "", valid: true, info: "Contact cannot be empty", validate: true },
          comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
          options: { loading: false, contact: "email", validate: false, category: CONTACT_US_CATEGORIES[0].value },
        });
  
        enqueueSnackbar("Message sent successfully, We'll get in touch soon", { variant: "success" }); // <=  Inform user of regex error
      });
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Error initiating account deletion", { variant: "error" }); // <=  Inform user of regex error
    } finally {
      setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
    }
  };

  const contactPrefHandler = (e: SelectChangeEvent) =>
  {
    const preference: string = e.target.value;
    setUserForm((values) => ({ ...values, options: { ...values.options, contact: preference } }));
    try {
      validator({ value: userForm.contact.value.trim(), type: <Validator["type"]>preference, label: CONTACT_PREFERENCE[preference] });
      setUserForm((values) => ({ ...values, contact: { ...values.contact, valid: true } }));
      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }) {
      enqueueSnackbar(message || "Contact is invalid", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values) => ({ ...values, contact: { ...values.contact, valid: false } }));
    }
  };


  const onInputChange = (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) =>
  {
    const { value, id } = e.target;
  
    const validatorId = id === "contact" ? userForm.options.contact : id;
  
    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
    try {
      validator({ value: value.trim(), type: <Validator["type"]>validatorId, label: validatorId !== id ? CONTACT_PREFERENCE[validatorId] : null });
  
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
  
      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (onBlur) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
    }
  };






    





  return <Contact {...{ sectionHandler, contactPreference:CONTACT_PREFERENCE, categories:CONTACT_US_CATEGORIES, submitHandler, categoryRef, userForm, onInputChange, contactPrefHandler }} />;
};

