import { styles } from "/";

const ErrorPage = ({ err }) => (
  <div className={styles.errorPage}>
    <b>{err.errCode}</b>
    <span>{err.errTitle}</span>
  </div>
);

export default ErrorPage;
