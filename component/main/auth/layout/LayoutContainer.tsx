import { connect } from "react-redux";

import { Layout } from ".";
import { logoutAction } from "@store/actions";

const SigninContainer = (props: any) => {
  return <Layout children={props.children} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
