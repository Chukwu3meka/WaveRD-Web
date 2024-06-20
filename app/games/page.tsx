import Link from "next/link";

import { Result } from "antd";
import { Button } from "@mui/material";

const FallbackPage = () => (
  <main style={{ justifyContent: "center" }}>
    <Result
      status={404}
      title="404"
      subTitle="Sorry, the page you have visited does not exist."
      extra={
        <Link href="/games/home">
          <Button variant="contained">Football manager</Button>
        </Link>
      }
    />
  </main>
);

export default FallbackPage;
