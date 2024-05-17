"use client";

import Link from "next/link";

import { Result } from "antd";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { VerificationFailed, VerificationSuccess } from ".";

type Status = "success" | "failed";

const EmailVerification = () => {
  const searchParams = useSearchParams(),
    status = searchParams.get("status") as Status;

  switch (status) {
    case "success":
      return <VerificationSuccess />;
    case "failed":
      return <VerificationFailed />;
    default:
      return (
        <main style={{ height: "calc(var(--visibleScreen) - (var(--headerHeight) + var(--headerHeight)))" }}>
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
  }
};

export default EmailVerification;
