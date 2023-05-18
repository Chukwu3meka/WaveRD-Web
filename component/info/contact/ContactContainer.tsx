import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useRef, useEffect } from "react";

import { Contact } from ".";
import { Router, useRouter } from "next/router";
import ComingSoon from "@component/shared/comingSoon";

import { connector, ConnectorProps } from "@store";

import { UserForm } from "@interface/components/info/dataDeletion";

import { handlers } from ".";
import { SelectChangeEvent } from "@mui/material/Select";

const contactLinks = [
  { title: "ViewCrunch Services", path: "/company" },
  { title: "Reporting a user", path: "/info/faq?id=Reporting-a-user" },
  { title: "Advertisement and Pricing", path: "/info/advertise" },
  { title: "Visit Our FAQ section", path: "/info/faq" },
  { title: "Signing In", path: "/info/faq?id=Signing-In" },
];

const supportTeam = [
  {
    supportType: "Technical Support",
    image: "/images/layout/support.png",
    description: "Already using SoccerMASS and experiencing issues on our platform",
    buttonType: "technical",
  },
  {
    supportType: "Advertising",
    image: "/images/layout/advertise.png",
    description: "Having a pricing question or need help managing your ads",
    buttonType: "advertising",
  },
  {
    supportType: "Others",
    image: "/images/layout/others.png",
    description: "Evaluating our service? Not related to Technical support or Advertising",
    buttonType: "others",
  },
];

export default connector((props: ConnectorProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter(),
    commentRef = useRef(null),
    [values, setValues] = useState({ email: "", name: "", comment: "", section: "others" });

  useEffect(() => {
    setAuthenticated(!!props.auth);
  }, [props.auth]);

  const sectionHandler = ({ target: { value } }) => {
    setValues({ ...values, section: value });
    // scroll to comment on section change
    setTimeout(() => commentRef.current.focus(), 100);
  };

  const submitHandler = async () => {
    if (values.name && values.email && values.comment) {
      // const status = await fetcher("/api/info/contactus", values);
      // if (!status) return enqueueSnackbar(`Please, Try again. Server unable to handle request.`, { variant: "error" });
      // setValues({ email: "", name: "", comment: "", section: "others" });
      // enqueueSnackbar(`Submitted successful, We'll get in touch soon`, { variant: "success" });
      // } else {
      //   enqueueSnackbar(`Network connectivity issue.`, { variant: "warning" });
      // }
    } else {
      enqueueSnackbar(`All fields are mandatory.`, { variant: "warning" });
    }
  };

  const [userForm, setUserForm] = useState<any>({
    options: { showPassword: false, loading: false, validate: false, contact: "email" },
    contact: { value: "", valid: true, info: "Contact cannot be empty", validate: true },
    name: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
    comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
    password: { value: "", valid: true, info: "Password cannot be empty", validate: true },
  });

  const deleteDataHandler = () => handlers.deleteDataHandler({ enqueueSnackbar, setUserForm, userForm });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) =>
    handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar, onBlur });

  const contactPrefHandler = (e: SelectChangeEvent) =>
    setUserForm((values) => ({ ...values, options: { ...values.options, contact: e.target.value as string } }));

  return process.env.NODE_ENV === "production" ? (
    <ComingSoon header={true} />
  ) : (
    <Contact {...{ sectionHandler, setValues, contact, values, submitHandler, commentRef, supportTeam, userForm, onInputChange, contactPrefHandler }} />
  );
});

const contact = {
  email: "Email Address",
  whatsapp: "WhatsApp",
};
