import ComingSoon from "@component/shared/comingSoon";

const Page = () => (
  <main>
    <ComingSoon header={false} minHeight="calc(var(--visibleScreen) - var(--headerHeight))" />
  </main>
);

export default Page;
