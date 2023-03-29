import { RelativeHeader } from "@component/layout/header";
import { ApiHubIntro, Intro, ManagerIntro, Peaks } from ".";

const NoAuthHome = () => (
  <>
    <Intro />
    <ManagerIntro />
    <Peaks />
    <ApiHubIntro />
  </>
);

export default NoAuthHome;
