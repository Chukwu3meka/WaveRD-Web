import { connect } from "react-redux";

import { ForgotPassword } from ".";
import { logoutAction } from "@store/actions";

import ComingSoon from "@component/builder/comingSoon";

const ForgotPasswordContainer = (props: any) => {
  return process.env.NODE_ENV === "production" ? <ComingSoon /> : <ForgotPassword />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
