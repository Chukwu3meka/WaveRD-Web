import { Metadata } from "next";
import pageInfo from "utils/page-info";
import SignUpContainer from "components/accounts/signup";

export const metadata: Metadata = {
  title: pageInfo.signup.title,
  keywords: pageInfo.signup.keywords,
  description: pageInfo.signup.description,
};

export default function SignupPage() {
  return <SignUpContainer />;
}
