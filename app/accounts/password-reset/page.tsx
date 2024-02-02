import { Metadata } from "next";
import InitiatePasswordResetContainer from "components/accounts/initiate-password-reset";

export const metadata: Metadata = {
  title: "SoccerMASS: Password Reset",
  description: "Securely regain access to your SoccerMASS account. Follow these steps to reset your SoccerMass password today!",
  keywords: ["password reset", "forgot password", "soccer manager", "soccer", "soccermass", "football manager", "football"],
};

export default function InitiatePasswordResetPage() {
  return <InitiatePasswordResetContainer />;
}
