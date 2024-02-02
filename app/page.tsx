"use client";

import Footer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";
import { ApiHub, ManagerContainer, Welcome } from "components/home";

export default function HomePage() {
  return (
    <main>
      <HeaderContainer position="relative" />
      <Welcome />
      <ManagerContainer />
      <ApiHub />
      <Footer />
    </main>
  );
}
