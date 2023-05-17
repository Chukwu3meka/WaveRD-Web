import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useRef, useEffect } from "react";

import { Contact } from ".";
import { Router, useRouter } from "next/router";

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
    image: "/images/info/technicalSupport.png",
    description: "Already using ViewCrunch and experiencing issues on our platform",
    buttonType: "technical",
  },
  {
    supportType: "Advertising",
    image: "/images/info/advertising.png",
    description: "Having a pricing question or need help managing your ads",
    buttonType: "advertising",
  },
  {
    supportType: "Others",
    image: "/images/info/others.png",
    description: "Evaluating our service or issue not related to Technical support or Advertising",
    buttonType: "others",
  },
];

const ContactContainer = (props) => {
  const router = useRouter(),
    commentRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [values, setValues] = useState({ email: "", name: "", comment: "", section: "others" });

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    if (router.query.section === "service") {
      setValues({ ...values, section: "service" });
      // scroll to comment on section change
      setTimeout(() => commentRef.current.focus(), 100);
    }
  }, []);

  const sectionHandler = ({ target: { value } }) => {
    setValues({ ...values, section: value });
    // scroll to comment on section change
    setTimeout(() => commentRef.current.focus(), 100);
  };

  const submitHandler = async () => {
    if (values.name && values.email && values.comment) {
      if (online) {
        // const status = await fetcher("/api/info/contactus", values);
        // if (!status) return enqueueSnackbar(`Please, Try again. Server unable to handle request.`, { variant: "error" });

        setValues({ email: "", name: "", comment: "", section: "others" });
        enqueueSnackbar(`Submitted successful, We'll get in touch soon`, { variant: "success" });
      } else {
        enqueueSnackbar(`Network connectivity issue.`, { variant: "warning" });
      }
    } else {
      enqueueSnackbar(`All fields are mandatory.`, { variant: "warning" });
    }
  };

  return <Contact {...{ contactLinks, sectionHandler, setValues, values, submitHandler, commentRef, supportTeam }} />;
};

const mapStateToProps = (state) => ({
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContactContainer);
