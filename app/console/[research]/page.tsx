import { Suspense } from "react";

import Loading from "components/shared/loading";
import NavigationContainer from "components/shared/navigation";

const EndpointsPage = ({ params: { research } }: { params: { research: string } }) => (
  <Suspense fallback="Loading...">
    <NavigationContainer research={research} />
  </Suspense>
);

export default EndpointsPage;
