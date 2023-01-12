import { Fade } from "react-awesome-reveal";
import { ApiHubIntro, Intro, ManagerIntro, Leagues, styles } from ".";

const NoAuthHome = () => (
  <>
    {/* <div className={styles.home}> */}
    {/* <Fade direction="down" duration={2000}> */}

    <Intro />
    <ManagerIntro />
    <Leagues />
    {/* <ApiHubIntro /> */}
    {/* </div> */}
  </>
);

export default NoAuthHome;
