import { ErrorPage } from "@component/others";
import ResetContainer from "@component/auth/reset";

const Reset = ({ err, emailLinkOTP }) => {
  if (err) return <ErrorPage err={err} />;

  return <ResetContainer emailLinkOTP={emailLinkOTP} />;
};

export default Reset; 

export const getServerSideProps = async ({ query: { serverResetID, resetToken, handle } }) => {
  let emailLinkOTP = null;

  if (resetToken && serverResetID && handle) {
    const { deObfuscate } = require("@utils/clientFuncs");
    const { resetPassword } = require("@utils/serverFetch");

    const email = deObfuscate(resetToken);
    const otp = deObfuscate(serverResetID);

    emailLinkOTP = await resetPassword({ otp, email, handle });
  }

  return { props: { emailLinkOTP } };
};
