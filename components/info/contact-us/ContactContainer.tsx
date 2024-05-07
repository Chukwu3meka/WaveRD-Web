"use client";

import { Contact } from ".";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import validator from "utils/validator";
import { useState, useRef } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { CONTACT_PREFERENCE, CONTACT_US_CATEGORIES } from "utils/constants";

import { Validator } from "interfaces/utils/validator.interface";
import { CustomerUsForm } from "interfaces/components/others/info.interfaces";
import { ContactUsPayload } from "interfaces/services/console.interface";
import { ContactPreferences } from "interfaces/utils/constants.interface";
import consoleService from "services/console.service";

const INIT_USER_FORM: CustomerUsForm = {
  name: { value: "", valid: true, info: "Handle cannot be empty", mandatory: true },
  contact: { value: "", valid: true, info: "Contact cannot be empty", mandatory: true },
  comment: { value: "", valid: true, info: "Comment cannot be empty", mandatory: true },
  options: { loading: false, contact: "email", category: CONTACT_US_CATEGORIES[0].value },
};

export default function ContactContainer() {
  const categoryRef = useRef<HTMLDivElement>(null),
    { enqueueSnackbar, closeSnackbar } = useSnackbar(),
    [userForm, setUserForm] = useState<CustomerUsForm>(INIT_USER_FORM);

  const sectionHandler = (value: string) => {
    setUserForm((values: CustomerUsForm) => ({ ...values, options: { ...values.options, category: value } }));
    setTimeout(() => categoryRef.current?.focus(), 100);
  };

  const submitHandler = async () => {
    try {
      setUserForm((values: CustomerUsForm) => ({ ...values, options: { ...values.options, loading: true } }));

      const userData: ContactUsPayload = {
        name: "",
        contact: "",
        comment: "",
        category: userForm.options.category,
        preference: userForm.options.contact,
      };

      /* re-validate all values before registeration */
      for (const [id, { value }] of Object.entries(userForm)) {
        if (id !== "options") {
          const validatorId = id === "contact" ? userForm.options.contact : id,
            preferenceId = CONTACT_PREFERENCE[validatorId as keyof ContactPreferences];

          validator({ value: value.trim(), type: validatorId as Validator["type"], label: validatorId !== id ? preferenceId : null });
          setUserForm((values: CustomerUsForm) => ({
            ...values,
            [id]: { ...values[id as keyof CustomerUsForm], valid: true, info: null },
          }));
          userData[id as keyof ContactUsPayload] = value.trim(); // <= append input to userdata if its valid
        }
      }

      await consoleService
        .contactUs(userData)
        .then(async () => {
          setUserForm(INIT_USER_FORM);
          enqueueSnackbar("Success: We'll get in touch soon", { variant: "success" });
        })
        .catch((err: AxiosError) => {
          throw err.response?.data || {};
        });
    } catch ({ message }: any) {
      setUserForm((values: CustomerUsForm) => ({ ...values, options: { ...values.options, loading: false } }));
      enqueueSnackbar(message || "Something went wrong!!!", { variant: "error" }); // <=  Inform user of regex error
    }
  };

  const contactPrefHandler = (e: SelectChangeEvent) => {
    try {
      const preference = e.target.value as CustomerUsForm["options"]["contact"];
      setUserForm((values: CustomerUsForm) => ({ ...values, options: { ...values.options, contact: preference } }));

      if (userForm.contact.value.trim()) {
        validator({ value: userForm.contact.value.trim(), type: preference as Validator["type"], label: CONTACT_PREFERENCE[preference] });
        setUserForm((values: CustomerUsForm) => ({ ...values, contact: { ...values.contact, valid: true } }));
        closeSnackbar(); // <= hide any error that have been shown previously
      }
    } catch (err: any) {
      enqueueSnackbar(err.message || "Contact is invalid", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values: CustomerUsForm) => ({ ...values, contact: { ...values.contact, valid: false } }));
    }
  };

  const onInputChange = (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    const { value, id } = e.target,
      validatorId = id === "contact" ? userForm.options.contact : id,
      preferenceId = CONTACT_PREFERENCE[validatorId as keyof ContactPreferences];

    setUserForm((values: CustomerUsForm) => ({
      ...values,
      [id]: { ...values[id as keyof CustomerUsForm], value: id === "email" ? value.toLowerCase() : value },
    }));
    try {
      validator({ value: value.trim(), type: validatorId as Validator["type"], label: validatorId !== id ? preferenceId : null });
      setUserForm((values: CustomerUsForm) => ({ ...values, [id]: { ...values[id as keyof CustomerUsForm], valid: true, info: null } }));
      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (onBlur && value) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values: CustomerUsForm) => ({
        ...values,
        [id]: { ...values[id as keyof CustomerUsForm], valid: false, info: message || `Unable to validate ${id}`, validating: false },
      }));
    }
  };

  return (
    <Contact
      userForm={userForm}
      categoryRef={categoryRef}
      submitHandler={submitHandler}
      onInputChange={onInputChange}
      sectionHandler={sectionHandler}
      categories={CONTACT_US_CATEGORIES}
      contactPreference={CONTACT_PREFERENCE}
      contactPrefHandler={contactPrefHandler}
    />
  );
}
