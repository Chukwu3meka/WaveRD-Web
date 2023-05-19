import ComingSoon from "@component/shared/comingSoon";

const Page = () => (
  <main>
    <ComingSoon header={false} minHeight="calc(var(--visibleScreen) - var(--headerHeight))" finishDate={new Date("January 1 2024")} />
  </main>
);

export default Page;
