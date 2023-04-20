import { connect } from "react-redux";

import { ForgotPassword } from ".";
import { logoutAction } from "@store/actions";

import ComingSoon from "@component/builder/comingSoon";
import { useState } from "react";

const ForgotPasswordContainer = (props: any) => {
  const [info, setInfo] = useState(true);

  return process.env.NODE_ENV === "production" ? <ComingSoon /> : <ForgotPassword info={info} setInfo={setInfo} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
