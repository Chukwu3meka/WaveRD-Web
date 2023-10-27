import Head from "next/head";
import Signup from "@component/accounts/signup";

const Page = () => (
  <>
    <Head>
      <title>Sign Up</title>
      <meta name="description" content="Sign Up" />
      <meta property="og:description" content="SoccerMASS: Sign Up" />
      <meta name="keywords" content={`sign up, auth, signup, soccer manager, soccer, soccermass, football manager, football`} />
    </Head>

    <Signup />
  </>
);

export default Page;
