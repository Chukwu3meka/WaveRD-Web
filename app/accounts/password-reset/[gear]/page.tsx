import { Metadata } from "next";
import ConfirmPasswordResetContainer from "components/accounts/confirm-password-reset";

export const metadata: Metadata = {
  title: "Wave Research: Password Reset",
};

export default function ConfirmPasswordResetPage({ params: { gear } }: { params: { gear: string } }) {
  return <ConfirmPasswordResetContainer gear={gear} />;
}
