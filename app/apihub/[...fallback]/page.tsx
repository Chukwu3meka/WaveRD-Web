import Link from "next/link";

import { Result } from "antd";
import { Button } from "@mui/material";
import pageInfo from "utils/page-info";

const FallbackPage = () => (
  <main style={{ justifyContent: "center" }}>
    <Result
      status={404}
      title="404"
      subTitle="Sorry, the page you have visited does not exist."
      extra={
        <Link href={pageInfo.faq.path}>
          <Button variant="contained">Back to FAQ page</Button>
        </Link>
      }
    />
  </main>
);

export default FallbackPage;
