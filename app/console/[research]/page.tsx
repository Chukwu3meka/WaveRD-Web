import { Suspense } from "react";
import NavigationContainer from "components/shared/navigation";

const EndpointsPage = ({ params: { research } }: { params: { research: string } }) => (
  <Suspense fallback="Loading...">
    <NavigationContainer research={`console-${research}`} />
  </Suspense>
);

export default EndpointsPage;
