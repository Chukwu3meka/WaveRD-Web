import { Metadata } from "next";
import SignUpContainer from "components/accounts/signup";

export const metadata: Metadata = {
  title: "SoccerMASS: Sign Up",
  description: "Embark on an exciting soccer journey! Register for SoccerMASS to enjoy premium features, and experience the best in soccer networking.",
  keywords: ["signup", "register", "soccer manager", "soccer", "soccermass", "football manager", "football"],
};

export default function SignupPage() {
  return <SignUpContainer />;
}
