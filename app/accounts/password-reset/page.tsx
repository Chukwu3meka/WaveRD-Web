import { Metadata } from "next";
import InitiatePasswordResetContainer from "components/accounts/initiate-password-reset";
import pageInfo from "utils/page-info";

export const metadata: Metadata = {
  title: pageInfo.passwordReset.title,
  keywords: pageInfo.passwordReset.keywords,
  description: pageInfo.passwordReset.description,
};

const InitPasswordResetPage = () => <InitiatePasswordResetContainer />;

export default InitPasswordResetPage;
