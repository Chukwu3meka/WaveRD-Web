import Endpoints from "@component/apihub/endpoints";
import ComingSoon from "@component/shared/comingSoon";

const Page = () =>
  process.env.NODE_ENV === "production" ? (
    <main>
      <ComingSoon header={false} minHeight="calc(var(--visibleScreen) - var(--headerHeight))" />
    </main>
  ) : (
    <Endpoints />
  );

export default Page;
