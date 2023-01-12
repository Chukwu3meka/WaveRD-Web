import { Fade } from "react-awesome-reveal";
import { ApiHubIntro, Intro, ManagerIntro, Leagues, styles, Transparent } from ".";

const NoAuthHome = () => (
  <>
    {/* <div className={styles.home}> */}
    {/* <Fade direction="down" duration={2000}> */}

    <Intro />
    <ManagerIntro />
    <Transparent />
    {/* <ApiHubIntro /> */}
    {/* </div> */}
  </>
);

export default NoAuthHome;
