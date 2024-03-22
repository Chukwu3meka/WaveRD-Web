"use client";

import Header from "components/layouts/header";
import NotFound from "components/shared/not-found";
import FooterContainer from "components/layouts/footer";

const NotFoundPage = () => {
  return (
    <>
      <Header position="relative" />
      <NotFound />
      <FooterContainer />
    </>
  );
};

export default NotFoundPage;
