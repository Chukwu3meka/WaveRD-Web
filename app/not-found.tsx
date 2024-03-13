"use client";

import Header from "components/layouts/header";
import NotFound from "components/shared/not-found";
import FooterContainer from "components/layouts/footer";

export default function NotFoundPage() {
  return (
    <>
      <Header position="relative" />
      <NotFound />
      <FooterContainer />
    </>
  );
}
