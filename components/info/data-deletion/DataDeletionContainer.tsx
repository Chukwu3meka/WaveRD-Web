"use client";

import validator from "utils/validator";

import { DataDeletion } from ".";
import { AxiosError } from "axios";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { dataDeletionService } from "services/accounts.service";
import { Validator } from "interfaces/utils/validator.interface";
import { RootState } from "interfaces/redux-store/store.interface";
import { DataDeletionService } from "interfaces/services/accounts.interface";
import { DataDeletionContainer, DataDeletionForm } from "interfaces/components/info.interfaces";

const INIT_FORM: DataDeletionForm = {
  options: { showPassword: false, loading: false },
  email: { value: "", valid: true, info: "Email cannot be empty", mandatory: true },
  handle: { value: "", valid: true, info: "Handle cannot be empty", mandatory: true },
  comment: { value: "", valid: true, info: "Comment cannot be empty", mandatory: false },
  password: { value: "", valid: true, info: "Password cannot be empty", mandatory: true },
};

const DataDeletionContainer = (props: DataDeletionContainer) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(),
    [authenticated, setAuthenticated] = useState(false),
    [userForm, setUserForm] = useState<DataDeletionForm>(INIT_FORM);

  useEffect(() => {
    setAuthenticated(props.authenticated);
  }, [props.authenticated]);

  const handleClickShowPassword = () => {
    setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));
  };

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    const { value, id: tempId } = e.target;
    const id = tempId as keyof DataDeletionForm;

    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));

    try {
      if (id !== "options") {
        const { mandatory } = userForm[id];

        if (mandatory || (!mandatory && value)) {
          validator({ value: value.trim(), type: id as Validator["type"], label: id === "email" ? "Email Address" : null });
        }

        setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
        closeSnackbar(); // <= hide any error that have been shown previously
      }
    } catch ({ message }: any) {
      if (onBlur && id === "comment") enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
    }
  };

  const deleteDataHandler = async () => {
    try {
      setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

      const userData: DataDeletionService = { comment: "", email: "", handle: "", password: "" };

      /* re-validate all values before registeration */
      for (const [tempId, { value, mandatory }] of Object.entries(userForm)) {
        const id = tempId as keyof DataDeletionForm;
        if (id !== "options") {
          if (mandatory || (!mandatory && value)) {
            validator({ value: value.trim(), type: id as Validator["type"], label: id === "email" ? "Email Address" : null });
          }

          setUserForm((values: DataDeletionForm) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
          userData[id] = value.trim(); // <= append input to userdata if its valid
        }
      }

      await dataDeletionService(userData)
        .then(async () => {
          setUserForm(INIT_FORM);
          enqueueSnackbar("Data deletion initiated, Kindly check your mail for the next step", { variant: "success" }); // <=  Inform user of regex error
        })
        .catch((err: AxiosError) => {
          throw err.response?.data || {};
        });
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Error initiating account deletion", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values: DataDeletionForm) => ({ ...values, options: { ...values.options, loading: false } }));
    }
  };

  return <DataDeletion {...{ onInputChange, userForm, handleClickShowPassword, deleteDataHandler, authenticated }} />;
};

const mapStateToProps = (state: RootState) => ({ authenticated: state.account.authenticated }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataDeletionContainer);
