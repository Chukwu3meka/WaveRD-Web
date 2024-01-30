import Footer from "components/layouts/footer";
import HeaderContainer from "components/layouts/header";
import { ApiHub, ManagerContainer, Welcome } from "components/home";

const HomePage = () => (
  <main>
    <HeaderContainer position="relative" />
    <Welcome />
    <ManagerContainer />
    <ApiHub />
    <Footer />
  </main>
);

export default HomePage;
