"use client";

import FooterContainer from "components/layouts/footer";
import Header from "components/layouts/header";
import NotFound from "components/shared/not-found";

export default function NotFoundPage() {
  return (
    <>
      <Header position="relative" />
      <NotFound />
      <FooterContainer />
    </>
  );
}
