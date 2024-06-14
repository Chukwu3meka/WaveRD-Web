import { Suspense } from "react";

import Loading from "components/shared/loading";
import NavigationContainer from "components/shared/navigation";

const ConsoleMenuPage = ({ params: { research } }: { params: { research: string } }) => (
  <Suspense fallback={<Loading />}>
    <NavigationContainer research={research.replace("console-", "")} />
  </Suspense>
);

export default ConsoleMenuPage;
