"use client";

import { GamesLayout } from ".";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";

import GAMES_ROUTES from "routes/games.routes";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

const homeRoutes = GAMES_ROUTES.find((route) => route.path === "/games");
const teamRoutes = GAMES_ROUTES.find((route) => route.path === "/games/team");
const infoRoutes = GAMES_ROUTES.find((route) => route.path === "/games/info");

interface GamesLayoutContainerProps {
  currRoute: string;
  children: React.ReactNode;
}

const GamesLayoutContainer = (props: GamesLayoutContainerProps) => {
  const router = useRouter(),
    [activeRoute, setActiveRoute] = useState(1);

  useEffect(() => {
    if (props.currRoute.startsWith("/games/team")) {
      setActiveRoute(0);
    } else if (props.currRoute.startsWith("/games/info")) {
      setActiveRoute(2);
    } else {
      setActiveRoute(1);
    }
  }, [props.currRoute]);

  const navRoutes = [
    { id: 0, label: teamRoutes?.title || "", Icon: teamRoutes?.Icon || AllInclusiveIcon, path: teamRoutes?.path || "" },
    { id: 1, label: homeRoutes?.title || "", Icon: homeRoutes?.Icon || AllInclusiveIcon, path: homeRoutes?.path || "" },
    // { id: 4, label: "Trade", Icon: <RestoreIcon fontSize="small" />, path: "/games/" },
    // { id: 1, label: "Profile", Icon: <PersonIcon fontSize="small" />, path: "/games/" },
    // { id: 3, label: "Finance", Icon: <CurrencyBitcoinIcon fontSize="small" />, path: "/games/" },
    { id: 2, label: infoRoutes?.title || "", Icon: infoRoutes?.Icon || AllInclusiveIcon, path: infoRoutes?.path || "" },
  ];

  const handlerRouteChange = (id: number) => () => {
    const route = navRoutes.find((route) => route.id === id);

    if (route) {
      setActiveRoute(route.id);
      router.push(route.path);
    }
  };

  return (
    <GamesLayout activeRoute={activeRoute} handlerRouteChange={handlerRouteChange} navRoutes={navRoutes}>
      {props.children}
    </GamesLayout>
  );
};

const mapStateToProps = (state: RootState) => ({ currRoute: state.layout.route }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GamesLayoutContainer);
