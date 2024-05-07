"use client";

import Header from "components/shared/header";
import NotFound from "components/shared/not-found";
import FooterContainer from "components/shared/footer";

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
