import { Metadata } from "next";
import ConfirmPasswordResetContainer from "components/accounts/confirm-password-reset";

export const metadata: Metadata = {
  title: "Password Reset",
};

const ConfirmPasswordResetPage = ({ params: { gear } }: { params: { gear: string } }) => {
  return <ConfirmPasswordResetContainer gear={gear} />;
};

export default ConfirmPasswordResetPage;
