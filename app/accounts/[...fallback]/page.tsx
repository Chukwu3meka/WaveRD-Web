import Link from "next/link";
import pageInfo from "utils/page-info";

import { Result } from "antd";
import { Button } from "@mui/material";

const FallbackPage = () => (
  <main style={{ justifyContent: "center" }}>
    <Result
      status={404}
      title="404"
      subTitle="Sorry, the page you have visited does not exist."
      extra={
        <Link href={pageInfo.signin.path}>
          <Button variant="contained">Back to Login page</Button>
        </Link>
      }
    />
  </main>
);

export default FallbackPage;
