import { useRouter } from "next/router";

import { Success } from ".";

const SuccessContainer = ({ values: { mass, clubs, club, handle, email } }) => {
  const title = clubs.find((x) => x.ref === club).title;
  const router = useRouter();

  const redirectHandler = () => {
    router.push(`/auth/signin`);
  };

  return <Success {...{ mass, club, title, handle, email, redirectHandler }} />;
};

export default SuccessContainer;
