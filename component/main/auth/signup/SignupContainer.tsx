import { connect } from "react-redux";

import { Signup } from ".";
import { logoutAction } from "@store/actions";

const SignupContainer = (props: any) => {
  return <Signup />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
