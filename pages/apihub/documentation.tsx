import ComingSoon from "@component/shared/comingSoon";
import { Intro, Peaks } from "@component/apihub/home";

const Page = () =>
  process.env.NODE_ENV === "production" ? (
    <main>
      <ComingSoon header={false} minHeight="calc(var(--visibleScreen) - var(--headerHeight))" />
    </main>
  ) : (
    <main>
      <Intro />
      <Peaks />
    </main>
  );

export default Page;
