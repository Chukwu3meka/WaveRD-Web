import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

import { Deletion, handlers } from ".";
import { UserForm } from "@interface/components/accounts/signupInterface";
import { connector, ConnectorProps } from "@store";

export default connector((props: ConnectorProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setAuthenticated(!!props.auth);
  }, [props.auth]);

  const [userForm, setUserForm] = useState({
    options: { showPassword: false, loading: false },
    email: { value: "", valid: true, info: "Email cannot be empty" },
    handle: { value: "", valid: true, info: "Handle cannot be empty", validating: false },
    password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
    comment: { value: "", valid: true, info: "Comment cannot be empty", validating: false },
  });

  const registerHandler = () => handlers.registerHandler({ enqueueSnackbar, setUserForm, userForm, closeSnackbar });
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar, onBlur: true });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar, onBlur: false });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Deletion {...{ onInputChange, userForm, handleClickShowPassword, registerHandler, onBlurHandler, authenticated }} />;
});
