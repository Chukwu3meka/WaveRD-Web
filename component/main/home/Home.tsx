import { Fade } from "react-awesome-reveal";
import { ApiHubIntro, Intro, ManagerIntro, Breakdown, styles } from ".";

const NoAuthHome = () => (
  <>
    {/* <div className={styles.home}> */}
    {/* <Fade direction="down" duration={2000}> */}

    <Intro />
    <ManagerIntro />
    <Breakdown />
    {/* <ApiHubIntro /> */}
    {/* </div> */}
  </>
);

export default NoAuthHome;
