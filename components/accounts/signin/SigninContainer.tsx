"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Signin } from ".";
import { UserForm } from "interfaces/components/accounts.interfaces";
import { useStoreContext } from "components/providers/StoreContext";
import { deObfuscate, sleep } from "utils/helpers";
import validator from "utils/validator";
// import { deObfuscate } from "@utils/handlers";
// // import { connector, ConnectorProps } from "@store";

import { signinService } from "services/accounts.service";
import { OAUTH_PROVIDERS } from "utils/constants";
import { AxiosError } from "axios";
import { ApiResponse } from "interfaces/services/shared.interface";

const defaultFormValues: UserForm = { password: "", email: "", options: { showPassword: false, loading: false } };

export default function SigninContainer() {
  const router = useRouter(),
    searchParams = useSearchParams(),
    { enqueueSnackbar } = useSnackbar(),
    resParam = searchParams.get("response"),
    [iconOnly, setIconOnly] = useState(true),
    { deviceSize } = useStoreContext().layout,
    { setProfile, authenticated } = useStoreContext().user,
    [userForm, setUserForm] = useState<UserForm>(defaultFormValues),
    oAuthMessage = resParam && deObfuscate(decodeURIComponent(resParam as string));

  if (oAuthMessage) {
    for (const provider of OAUTH_PROVIDERS) {
      if (searchParams.get(provider)) enqueueSnackbar(oAuthMessage, { variant: "error" });
    }
  }

  useEffect(() => {
    setIconOnly(deviceSize.width < 460);
  }, [deviceSize.width]);

  const loginHandler = async () => {
    if (authenticated) return;

    const email = userForm.email.trim(),
      password = userForm.password;

    if (!email.trim()) return enqueueSnackbar(`Email cannot be empty`, { variant: "error" });
    if (!password) return enqueueSnackbar(`Email cannot be empty`, { variant: "error" });

    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const disableLoading = () => setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));

    try {
      validator({ value: email, type: "email" });
      validator({ value: password, type: "password" });

      await signinService({ email, password })
        .then(async ({ data }) => {
          setProfile(data);

          enqueueSnackbar("Authenticated Successfully", { variant: "success" });

          const redirectTarget = searchParams.get("redirect");
          if (redirectTarget && typeof redirectTarget === "string") return router.push(redirectTarget);

          router.push("/");
        })
        .catch(({ response }: AxiosError<ApiResponse>) => {
          const message = response ? response.data.message : "Invalid Email/Password";
          console.log({ message });

          enqueueSnackbar(message, { variant: "error" });
        })
        .finally(() => disableLoading());
    } catch (error) {
      disableLoading();
      enqueueSnackbar("Invalid Email/Password", { variant: "error" }); // <=  Don't inform user of regex error
    }
  };

  const onInputChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setUserForm((userForm: any) => ({ ...userForm, [id]: value }));
  };

  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signin {...{ onInputChange, handleClickShowPassword, userForm, loginHandler, iconOnly, authenticated }} />;
}
