import Head from "next/head";
import ForgotPassword from "@component/accounts/forgotPassword";

const Page = () => (
  <>
    <Head>
      <title>Forgot Password</title>
      <meta name="description" content="Forgot Password" />
      <meta property="og:description" content="SoccerMASS: Forgot Password" />
      <meta name="keywords" content={`forgot password, auth, forgot, reset, soccer manager, soccer, soccermass, football manager, football`} />
    </Head>

    <ForgotPassword />
  </>
);

export default Page;
