import EmailVerification from "components/accounts/email-verification";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wave Research: Email Verification",
};

const EmailVerificationPage = () => <EmailVerification />;

export default EmailVerificationPage;
