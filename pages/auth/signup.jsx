import { ErrorPage } from "@component/others";
import SignupContainer from "@component/auth/signup";

const Signup = ({ masses, err }) => {
  if (err) return <ErrorPage err={err} />;

  return <SignupContainer masses={masses} />;
};

export default Signup;

export const getServerSideProps = async () => {
  const { fetchMasses, errorProp } = require("@utils/serverFetch"),
    masses = await fetchMasses();

  if (!masses) return errorProp(404, "masses not found");

  return { props: { masses } };
};
