import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { setAuthSlideTextAction } from "@store/actions";

import { Verify } from ".";

const VerifyContainer = (props) => {
  const router = useRouter(),
    { setAuthSlideTextAction, msg, verified } = props;

  useEffect(() => {
    setAuthSlideTextAction("verify");
  }, []);

  const redirectHandler = () => {
    router.push(`/auth/signin`);
  };

  return <Verify {...{ verified, msg, redirectHandler }} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setAuthSlideTextAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyContainer);
