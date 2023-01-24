import { connect } from "react-redux";

import { Signin } from ".";
import { logoutAction } from "@store/actions";

const SigninContainer = (props: any) => {
  return <Signin />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
