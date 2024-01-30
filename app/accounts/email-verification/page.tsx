import EmailVerification from "components/accounts/email-verification";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SoccerMASS: Email Verification",
};

const EmailVerificationPage = () => <EmailVerification />;

export default EmailVerificationPage;
