import ComingSoon from "@component/shared/comingSoon";

const Manager = () => (
  <main>
    <ComingSoon header={false} minHeight="calc(var(--visibleScreen) - var(--headerHeight))" finishDate={new Date("May 13 2024")} />
  </main>
);

export default Manager;
