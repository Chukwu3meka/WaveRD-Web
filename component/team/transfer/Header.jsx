import { connect } from "react-redux";
import Paper from "@mui/material/Paper";

import { styles } from ".";

const Header = ({ tab, setTab, deviceWidth }) => (
  <Paper className={styles.header} elevation={2}>
    <main>
      <Paper elevation={2}>
        <span onClick={() => setTab("offers")} style={{ borderBottom: tab === "offers" ? "3px double green" : "none" }}>
          {deviceWidth >= 400 ? "Offers" : "OFF"}
        </span>
      </Paper>
      <Paper elevation={2}>
        <span onClick={() => setTab("market")} style={{ borderBottom: tab === "market" ? "3px double green" : "none" }}>
          {deviceWidth >= 400 ? "Market" : "MKT"}
        </span>
      </Paper>
      <Paper elevation={2}>
        <span onClick={() => setTab("targets")} style={{ borderBottom: tab === "targets" ? "3px double green" : "none" }}>
          {deviceWidth >= 400 ? "Targets" : "TGT"}
        </span>
      </Paper>
      <Paper elevation={2}>
        <span onClick={() => setTab("transfers")} style={{ borderBottom: tab === "transfers" ? "3px double green" : "none" }}>
          {deviceWidth >= 400 ? "Transfers" : "TRF"}
        </span>
      </Paper>
    </main>
  </Paper>
);

const mapStateToProps = (state) => ({
    deviceWidth: state.layout.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
