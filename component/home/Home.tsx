import { RelativeHeader } from "@component/builder/header";
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
