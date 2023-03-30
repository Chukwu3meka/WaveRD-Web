import { RelativeHeader } from "@component/layout/header";
import { ApiHubIntro, Intro, ManagerIntro, PeaksContainer } from ".";

const NoAuthHome = () => (
  <>
    <Intro />
    <ManagerIntro />
    <PeaksContainer />
    <ApiHubIntro />
  </>
);

export default NoAuthHome;
