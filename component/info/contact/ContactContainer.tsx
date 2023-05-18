import { useSnackbar } from "notistack";
import { useState, useRef } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

import { Contact, handlers } from ".";
import contactPreference from "@utils/constants/contactPreference";

import { Categories } from "@interface/components/info/contactUs";

export default () => {
  const categoryRef = useRef(null),
    { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const sectionHandler = (value: string) => {
    setUserForm((values: any) => ({ ...values, options: { ...values.options, category: value } }));
    setTimeout(() => categoryRef.current.focus(), 100);
  };

  const [userForm, setUserForm] = useState<any>({
    name: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
    contact: { value: "", valid: true, info: "Contact cannot be empty", validate: true },
    comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
    options: { loading: false, contact: "email", validate: false, category: categories[0].value },
  });

  const submitHandler = () => handlers.submitHandler({ enqueueSnackbar, setUserForm, userForm, contactPreference, categories });
  const contactPrefHandler = (e: SelectChangeEvent) =>
    handlers.contactPrefHandler({ e, userForm, contactPreference, setUserForm, enqueueSnackbar, closeSnackbar });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) =>
    handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar, onBlur, userForm, contactPreference });

  return <Contact {...{ sectionHandler, contactPreference, categories, submitHandler, categoryRef, userForm, onInputChange, contactPrefHandler }} />;
};

const categories: Categories[] = [
  { value: "others", label: "Others" },
  { value: "technical", label: "Technical" },
  { value: "suggestion", label: "Suggestion" },
  { value: "advertising", label: "Advertising" },
  { value: "service", label: "Digital Service" },
];
