import { Metadata } from "next";

import pageInfo from "utils/page-info";
import SigninContainer from "components/accounts/signin";

export const metadata: Metadata = {
  title: pageInfo.signin.title,
  keywords: pageInfo.signin.keywords,
  description: pageInfo.signin.description,
};

const SigninPage = () => <SigninContainer />;

export default SigninPage;
