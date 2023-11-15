import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { Deletion } from ".";
import fetcher from "@utils/fetcher";
import { sleep } from "@utils/handlers";
import validator from "@utils/validator";
import { connector, ConnectorProps } from "@store";

import { UserForm } from "@interface/components/info/dataDeletion";
import { Validator as IValidator } from "@interface/utils/validatorInterface";

const DeltionContainer = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<UserForm>({
    options: { showPassword: false, loading: false, validate: false },
    email: { value: "", valid: true, info: "Email cannot be empty", validate: true },
    handle: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
    comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
    password: { value: "", valid: true, info: "Password cannot be empty", validate: true },
  });

  useEffect(() => {
    setAuthenticated(!!props.auth);
  }, [props.auth]);

  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    const { value, id } = e.target;

    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));
    try {
      validator({ value: value.trim(), type: id as IValidator["type"], label: id === "email" ? "Email Address" : null });

      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (onBlur && id === "comment") enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
    }
  };

  const deleteDataHandler = async () => {
    try {
      setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

      const userData: any = {};

      /* re-validate all values before registeration */
      for (const [id, { value, validate }] of Object.entries(userForm)) {
        if (validate) {
          validator({ value: value.trim(), type: id as IValidator["type"], label: id === "email" ? "Email Address" : null });
          setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
          userData[id] = value.trim(); // <= append input to userdata if its valid
        }
      }

      // await fetcher({ method: "POST", data: userData, endpoint: "/console/contact-us" }).then(async () => {
      await fetcher({ method: "POST", data: userData, endpoint: "/accounts/data-deletion" }).then(async () => {
        await sleep(0.3);

        setUserForm({
          options: { showPassword: false, loading: false, validate: false },
          email: { value: "", valid: true, info: "Email cannot be empty", validate: true },
          handle: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
          comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
          password: { value: "", valid: true, info: "Password cannot be empty", validate: true },
        });

        enqueueSnackbar("Data deletion initiated, Kindly check your mail for the next step", { variant: "success" }); // <=  Inform user of regex error
      });
    } catch ({ message }: any) {
      enqueueSnackbar("Your data will be deleted after 30 days of inactivity.", { variant: "success" }); // <=  Inform user of regex error

      setUserForm({
        options: { showPassword: false, loading: false, validate: false },
        email: { value: "", valid: true, info: "Email cannot be empty", validate: true },
        handle: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
        comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
        password: { value: "", valid: true, info: "Password cannot be empty", validate: true },
      });
    }

    // enqueueSnackbar(message || "Error initiating account deletion", { variant: "error" }); // <=  Inform user of regex error
    // setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
  };

  return <Deletion {...{ onInputChange, userForm, handleClickShowPassword, deleteDataHandler, authenticated }} />;
};

const mapStateToProps = (state) => ({ auth: state.auth }),
  mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(DeltionContainer);
