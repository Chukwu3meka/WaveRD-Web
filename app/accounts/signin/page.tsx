import SigninContainer from "components/accounts/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SoccerMASS: The Leading Soccer Management Solution and Football API Supplier.",
  description: "Seamlessly sign in to your account for personalized content, live updates, and more – sign in to SoccerMASS now!",
  keywords: ["soccer manager", "soccer", "soccermass", "football manager", "football"],
};

export default function Signin() {
  return <SigninContainer />;
}
