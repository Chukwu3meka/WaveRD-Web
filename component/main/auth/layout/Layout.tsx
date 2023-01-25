import { styles } from ".";

const Layout = ({ children }: any) => (
  <div className={styles.layout}>
    <aside>
      <p>Layout sidebar</p>
    </aside>
    <main>{children}</main>
  </div>
);

export default Layout;
