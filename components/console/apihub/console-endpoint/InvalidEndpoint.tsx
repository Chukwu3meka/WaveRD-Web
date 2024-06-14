import Link from "next/link";

import { Result } from "antd";
import { Button } from "@mui/material";

const InvalidEndpoint = () => (
  <main style={{ justifyContent: "center" }}>
    <Result
      status={404}
      title="404"
      subTitle="Sorry, the endpoint you selected does not exist."
      extra={
        <Link href="/console/apihub/modify-endpoints">
          <Button variant="contained">Back to Endpoints</Button>
        </Link>
      }
    />
  </main>
);

export default InvalidEndpoint;
