import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useRef, useEffect } from "react";

import { Contact } from ".";
import { Router, useRouter } from "next/router";
import ComingSoon from "@component/shared/comingSoon";

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

export default (props) => {
  const router = useRouter(),
    commentRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [values, setValues] = useState({ email: "", name: "", comment: "", section: "others" });

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

  return process.env.NODE_ENV === "production" ? (
    <ComingSoon header={true} />
  ) : (
    <Contact {...{ contactLinks, sectionHandler, setValues, values, submitHandler, commentRef, supportTeam }} />
  );
};
