import { useState } from "react";
import { Signup, Success } from ".";
import fetcher from "@utils/fetcher";
import { useSnackbar } from "notistack";
import validator from "@utils/validator";
import { capitalize, sleep } from "@utils/handlers";

import { Validator } from "@interface/utils/validatorInterface";
import { UserForm } from "@interface/components/accounts/signupInterface";

const SignupContainer = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [userForm, setUserForm] = useState<UserForm>({
    email: { value: "", valid: true, info: "Email cannot be empty" },
    fullName: { value: "", valid: true, info: "Full Name cannot be empty" },
    options: { showPassword: false, loading: false, accountCreated: false },
    handle: { value: "", valid: true, info: "Handle cannot be empty", validating: false },
    password: { value: "", valid: true, info: "Password cannot be empty", validating: false },
  });

  const registerHandler = async () => {
    try {
      setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

      const userData: any = {};

      /* re-validate all values before registeration */
      for (const [id, { value }] of Object.entries(userForm)) {
        if (id !== "options") {
          validator({ value: value.trim(), type: id as Validator["type"], label: id === "email" ? "Email Address" : null });
          setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
          userData[id] = value.trim(); // <= append input to userdata if its valid
        }
      }

      await fetcher({ method: "POST", data: userData, endpoint: "/accounts/signup" }).then(async () => {
        await sleep(0.3);
        setUserForm((values: any) => ({ ...values, options: { ...values.options, accountCreated: true } }));
      });

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Error creating your account", { variant: "error" }); // <=  Inform user of regex error
    } finally {
      setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
    }
  };

  const valueChangeFn = async (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) => {
    const { value, id } = e.target;

    if (onBlur && value.trim() === userForm[id].value) {
      // Don't revalidate input if user has not made change to previous value, Notify user if onBlur when there's an error with the value
      if (!userForm[id].valid) return enqueueSnackbar(userForm[id].info, { variant: "error" });

      return; // <= terminate parent function execution
    }

    setUserForm((values: any) => ({ ...values, [id]: { ...values[id], value: id === "email" ? value.toLowerCase() : value } }));

    try {
      validator({ value: value.trim(), type: id as Validator["type"], label: id === "email" ? "Email Address" : null });

      if (["handle", "email"].includes(id)) {
        setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null, validating: true } }));

        await fetcher({ endpoint: `/accounts/${id}_exists`, method: "POST", data: { [id]: value } }).then(async ({ data: { exists } }) => {
          if (exists) throw { message: `${capitalize(id)} not available, Kindly use a different ${capitalize(id)}` };
          setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null, validating: false } }));
        });
      } else {
        setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: true, info: null } }));
      }

      closeSnackbar(); // <= hide any error that have been shown previously
    } catch ({ message }: any) {
      if (onBlur) enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
      setUserForm((values: any) => ({ ...values, [id]: { ...values[id], valid: false, info: message || `Unable to validate ${id}`, validating: false } }));
    }
  };

  const onBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => valueChangeFn(e, true);
  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>) => valueChangeFn(e, false);

  const handleClickShowPassword = () => {
    setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));
  };

  return userForm.options.accountCreated ? <Success /> : <Signup {...{ onInputChange, userForm, handleClickShowPassword, registerHandler, onBlurHandler }} />;
};

export default SignupContainer;
