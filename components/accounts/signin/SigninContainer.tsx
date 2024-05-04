"use client";

import validator from "utils/validator";
import AccountsService from "services/accounts.service";

import { Signin } from ".";
import { AxiosError } from "axios";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { OAUTH_PROVIDERS } from "utils/constants";
import { capitalize, deObfuscate } from "utils/helpers";
import { FocusEvent, useEffect, useState } from "react";
import { setProfileAction } from "../../../redux-store/actions";
import { RootState } from "interfaces/redux-store/store.interface";
import { ApiResponse } from "interfaces/services/shared.interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SigninContainerProps, SigninForm } from "interfaces/components/accounts.interfaces";

const defaultFormValues: SigninForm = { password: "", email: "", options: { showPassword: false, loading: false } };

const SigninContainer = (props: SigninContainerProps) => {
  const accountsService = new AccountsService(),
    router = useRouter(),
    pathname = usePathname(),
    { setProfileAction } = props,
    searchParams = useSearchParams(),
    { enqueueSnackbar } = useSnackbar(),
    resParam = searchParams.get("response"),
    [iconOnly, setIconOnly] = useState(true),
    [authenticated, setAuthenticated] = useState(false),
    [target, setTarget] = useState<null | string>(null),
    [userForm, setUserForm] = useState<SigninForm>(defaultFormValues),
    oAuthMessage = resParam && deObfuscate(decodeURIComponent(resParam as string));

  useEffect(() => {
    setAuthenticated(props.authenticated);
  }, [props.authenticated]);

  useEffect(() => {
    setIconOnly(props.deviceWidth < 460);
  }, [props.deviceWidth]);

  useEffect(() => {
    const target = searchParams.get("target");
    if (target) {
      const targetSplit = target.split("/"),
        destination = targetSplit[targetSplit.length - 1].replaceAll("-", " ");

      setTarget(target);
      router.replace("/accounts/signin");
      enqueueSnackbar(`Kindly signin to access '${capitalize(destination)}'`, { variant: "error" });
    }

    return () => {
      setTarget(null);
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    if (oAuthMessage) {
      for (const provider of OAUTH_PROVIDERS) {
        if (searchParams.get(provider)) {
          enqueueSnackbar(oAuthMessage, { variant: "error" });

          router.replace("/accounts/signin");
          return;
        }
      }
    }
  }, [oAuthMessage]);

  const loginHandler = async (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (authenticated) return;

    const email = userForm.email.trim(),
      password = userForm.password.trim();

    if (!email) return enqueueSnackbar(`Email cannot be empty`, { variant: "error" });
    if (!password) return enqueueSnackbar(`Email cannot be empty`, { variant: "error" });

    setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: true } }));

    const disableLoading = () => {
      setUserForm((values: any) => ({ ...values, options: { ...values.options, loading: false } }));
    };

    try {
      validator({ value: email, type: "email" });
      validator({ value: password, type: "password" });

      await accountsService
        .signin({ email, password })
        .then(async ({ data }) => {
          if (setProfileAction) setProfileAction(data);
          enqueueSnackbar("Authenticated Successfully", { variant: "success" });

          if (target) return router.push(target);
          router.push("/");
        })
        .catch(({ response }: AxiosError<ApiResponse<string>>) => {
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

  const handleClickShowPassword = () =>
    setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));

  return <Signin {...{ onInputChange, handleClickShowPassword, userForm, loginHandler, iconOnly, authenticated }} />;
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
