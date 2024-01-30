"use client";

import { Signin } from ".";
import { AxiosError } from "axios";
import validator from "utils/validator";
import { useSnackbar } from "notistack";
import { FocusEvent, useEffect, useState } from "react";
import { deObfuscate } from "utils/helpers";
import { OAUTH_PROVIDERS } from "utils/constants";
import { signinService } from "services/accounts.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useStoreContext } from "components/providers/StoreContext";

import { ApiResponse } from "interfaces/services/shared.interface";
import { SigninForm } from "interfaces/components/accounts.interfaces";

const defaultFormValues: SigninForm = { password: "", email: "", options: { showPassword: false, loading: false } };

export default function SigninContainer() {
  const router = useRouter(),
    searchParams = useSearchParams(),
    { enqueueSnackbar } = useSnackbar(),
    resParam = searchParams.get("response"),
    [iconOnly, setIconOnly] = useState(true),
    { deviceSize } = useStoreContext().layout,
    { setProfile, authenticated } = useStoreContext().user,
    [userForm, setUserForm] = useState<SigninForm>(defaultFormValues),
    oAuthMessage = resParam && deObfuscate(decodeURIComponent(resParam as string));

  if (oAuthMessage) {
    for (const provider of OAUTH_PROVIDERS) {
      if (searchParams.get(provider)) enqueueSnackbar(oAuthMessage, { variant: "error" });
    }
  }

  useEffect(() => {
    setIconOnly(deviceSize.width < 460);
  }, [deviceSize.width]);

  const loginHandler = async (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (authenticated) return;

    const email = userForm.email.trim(),
      password = userForm.password.trim();

    if (!email) return enqueueSnackbar(`Email cannot be empty`, { variant: "error" });
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

          enqueueSnackbar(message, { variant: "error" });
          setUserForm((values: any) => ({ ...values, password: "" }));
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
