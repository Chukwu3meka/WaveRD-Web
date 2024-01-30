"use client";

import { useSearchParams } from "next/navigation";
import NotFound from "components/shared/not-found";
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
      return <NotFound height="calc(var(--visibleScreen) - (var(--headerHeight) + var(--headerHeight)))" />;
  }
};

export default EmailVerification;
