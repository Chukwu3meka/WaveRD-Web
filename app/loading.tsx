import Footer from "components/layouts/footer";
import Header from "components/layouts/header";
import Loading from "components/shared/loading";

export default function LoadingPage() {
  return (
    <>
      <Header position="relative" />
      <Loading />
      <Footer />
    </>
  );
}
