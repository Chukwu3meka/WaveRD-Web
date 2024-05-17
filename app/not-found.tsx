"use client";

import Link from "next/link";
import Header from "components/shared/header";
import FooterContainer from "components/shared/footer";

import { Result } from "antd";
import { Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <>
      <Header position="relative" />
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
      <FooterContainer />
    </>
  );
};

export default NotFoundPage;
