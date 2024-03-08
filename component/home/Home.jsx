import Grid from "@mui/material/Grid";

import { connect } from "react-redux";
import { useEffect, useState } from "react";

import Spinner from "@component/others/Spinner";
import PageIcon from "@component/others/PageIcon";
import { fetchHomePageDataAction } from "@store/actions";
import { homeStyles, Calendar, ClubNews, Table, Goal, MassNews, MassStat } from "/";

const HomeContainer = (props) => {
  const [homeData, setHomeData] = useState(null);
  const { fetchHomePageDataAction, auth } = props;
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    if (props.auth.club && !pageReady) {
      fetchHomePageDataAction({ division: props.auth.division });
      setPageReady(true);
    }
  }, [props.auth]);

  useEffect(() => {
    if (pageReady && props.homePageData) setHomeData(props.homePageData);
  }, [props.homePageData]);

  return homeData ? (
    <Grid container justifyContent="space-between" className={homeStyles.home}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <ClubNews homeStyles={homeStyles} clubNews={homeData.clubNews} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <div className={homeStyles.aside}>
          <Table homeStyles={homeStyles} table={homeData.table} />
          <Calendar homeStyles={homeStyles} calendar={homeData.calendar} />
          <Goal homeStyles={homeStyles} goal={homeData.goal} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <div className={homeStyles.otherLinks}>
          <PageIcon title="Mail" src="/layout/mail.png" href="/profile/mail" />
          <PageIcon title="" src="/layout/transfer.png" href="/team/transfer" />
          <PageIcon title="Tactics" src="/layout/tactics.png" href="/team/tactics" />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <MassNews homeStyles={homeStyles} massNews={homeData.massNews} sponsor={homeData.sponsor} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <MassStat homeStyles={homeStyles} nextDivisionFixture={homeData.nextDivisionFixture} transfer={homeData.transfer} />
      </Grid>
    </Grid>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => ({
  auth: state.profile.auth,
  homePageData: state.mass.homePageData,
});

const mapDispatchToProps = { fetchHomePageDataAction };

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
