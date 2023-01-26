import { connect } from "react-redux";

import { Layout } from ".";
import { logoutAction } from "@store/actions";
import { useEffect } from "react";

const SigninContainer = ({ component }: any) => {
  return <Layout component={component} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
