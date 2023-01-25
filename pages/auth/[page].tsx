import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import LayoutContainer from "@component/main/auth/authLayout";

const Page = () => {
  const router = useRouter();
  const { page } = router.query;

  // ? Verify that user has visited a valid auth page
  if (!["emailConfirmation", "forgotPassword", "passwordReset", "signin", "signup"].includes(page as string)) return <ErrorPage statusCode={404} />;

  const AuthPageContainer = dynamic(() => import(`@component/main/auth/${page}`));

  return (
    <LayoutContainer>
      <AuthPageContainer />
    </LayoutContainer>
  );
};

export default Page;
