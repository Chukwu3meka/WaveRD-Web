"use client";

import Link from "next/link";

import { Result } from "antd";
import { Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <main>
      <Result
        status={404}
        title="404"
        subTitle="Sorry, the page you have visited does not exist."
        extra={
          <Link href="/">
            <Button variant="contained">Back Home</Button>
          </Link>
        }
      />
    </main>
  );
};

export default NotFoundPage;
