import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  router.push("/accounts/signin");
};

export default Page;
