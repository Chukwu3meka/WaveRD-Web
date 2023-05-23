import ComingSoon from "@component/shared/comingSoon";
import { Intro, Peaks } from "@component/apihub/home";
import { Endpoints } from "@component/apihub/endpoints";

const Page = () =>
  process.env.NODE_ENV === "production" ? (
    <main>
      <ComingSoon header={false} minHeight="calc(var(--visibleScreen) - var(--headerHeight))" />
    </main>
  ) : (
    <Endpoints />
  );

export default Page;
