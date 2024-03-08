import { ErrorPage } from "@component/others";
import VerifyContainer from "@component/auth/verify";

const Verify = ({ msg, verified, err }) => {
  if (err) return <ErrorPage err={err} />;

  return <VerifyContainer msg={msg} verified={verified} />;
};

export default Verify;

export const getServerSideProps = async ({ query: { signupReference, serverStamp, handle } }) => {
  let verified = null,
    msg =
      "It's great to see you again. Unfortunately we're unable to verify your email account at this time, seems the link is broken or has expired. Never mind, we've sent another verification mail to you. Kindly click on the verification link, you received from SoccerMASS.";

  if (signupReference && serverStamp && handle) {
    const { verifyAccount } = require("@utils/serverFetch");
    const res = await verifyAccount({ signupReference, handle, serverStamp });
    if (res === "verified") {
      verified = true;
      msg = `It's nice to see you again. Your account with handle: ${handle}, created on ${new Date(
        Number(serverStamp)
      ).toDateString()} has been verified. Kindly Signin below, to enjoy extensive access to the best online Soccer Manager platform ever created. Thanks again for registering.`;
    }
  }

  return {
    props: {
      msg: msg,
      verified,
    },
  };
};
