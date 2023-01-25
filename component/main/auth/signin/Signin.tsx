import { SocialAuth, styles } from ".";

const Signin = ({}: any) => (
  <div className={styles.signin}>
    {/*  */}

    <SocialAuth />

    <div>
      <span>
        <i>eMail Signin</i>
      </span>
    </div>
  </div>
);

export default Signin;
