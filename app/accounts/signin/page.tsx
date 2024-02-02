import { Metadata } from "next";
import SigninContainer from "components/accounts/signin";

export const metadata: Metadata = {
  title: "SoccerMASS: Sign In",
  keywords: ["signin", "login", "soccer manager", "soccer", "soccermass", "football manager", "football"],
  description: "Seamlessly sign in to your account for personalized content, live updates, and more – sign in to SoccerMASS now!",
};

export default function SigninPage() {
  return <SigninContainer />;
}
