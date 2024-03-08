import { Grid } from "@mui/material";
import { connect } from "react-redux";

import { PageIcon } from "@component/others";
import teamStyles from "./styles.module.scss";

const TeamContainer = ({ deviceWidth }) =>
  deviceWidth >= 780 ? (
    <div className={teamStyles.teamMax}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item container xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <PageIcon title="My Squad" src="/layout/squad.png" href="/team/squad" />
            <PageIcon title="History" src="/layout/stadium.png" href="/team/history" />
            <PageIcon title="Tactics" src="/layout/tactics.png" href="/team/tactics" />
          </Grid>
          <Grid item container xs={12} sm={12} md={12} lg={12}>
            <PageIcon title="Finance" src="/layout/finance.png" href="/team/finance" />
            <PageIcon title="" src="/layout/transfer.png" href="/team/transfer" />
            <PageIcon title="Tournament" src="/layout/calendar.png" href="/team/tournament" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div className={teamStyles.teamMin}>
      <div>
        <PageIcon title="Finance" src="/layout/finance.png" href="/team/finance" />
        <PageIcon title="History" src="/layout/stadium.png" href="/team/history" />
      </div>
      <div>
        <PageIcon title="My Squad" src="/layout/squad.png" href="/team/squad" />
        <PageIcon title="Tactics" src="/layout/tactics.png" href="/team/tactics" />
      </div>
      <div>
        <PageIcon title="" src="/layout/transfer.png" href="/team/transfer" />
        <PageIcon title="Tournament" src="/layout/calendar.png" href="/team/tournament" />
      </div>
    </div>
  );

const mapStateToProps = (state) => ({
    deviceWidth: state.layout.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer);
