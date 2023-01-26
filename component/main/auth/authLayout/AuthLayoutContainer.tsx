import { connect } from "react-redux";

import { AuthLayout } from ".";
import { logoutAction } from "@store/actions";

const AuthLayoutContainer = ({ component }: any) => {
  return <AuthLayout component={component} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayoutContainer);
