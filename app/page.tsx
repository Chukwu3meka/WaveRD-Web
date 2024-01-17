import { ApiHub, Welcome } from "components/home";
import Footer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";
// import ApiHub from "components/home/ApiHub";

export default function Home() {
  return (
    <main>
      <HeaderContainer position="relative" />
      <Welcome />
      {/* <ManagerContainer /> */}
      <ApiHub />
      <Footer />
    </main>
  );
}
