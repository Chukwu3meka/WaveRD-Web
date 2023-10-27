import Head from "next/head";
import Signin from "@component/accounts/signin";

const Page = () => (
  <>
    <Head>
      <title>Sign In</title>
      <meta name="description" content="Sign In" />
      <meta property="og:description" content="SoccerMASS: Sign In" />
      <meta name="keywords" content={`sign in, auth, signin, soccer manager, soccer, soccermass, football manager, football`} />
    </Head>

    <Signin />
  </>
);

export default Page;
