import { Metadata } from "next";
import SignUpContainer from "components/accounts/signup";

export const metadata: Metadata = {
  title: "Sign Up",
  keywords: ["signup", "register", "soccer manager", "soccer", "soccermass", "football manager", "football"],
  description: "Join SoccerMass – for exciting soccer events, connect with players, and experience the best in soccer networking. Create your account now!",
};

export default function Signup() {
  return <SignUpContainer />;
}
