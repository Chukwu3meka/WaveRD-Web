"use client";

import { styles } from ".";
import { Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { SvgIconComponent } from "@mui/icons-material";

import HeaderContainer from "../../shared/header";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

interface GamesLayoutProps {
  activeRoute: number;
  children: React.ReactNode;
  handlerRouteChange: (newValue: number) => () => void;
  navRoutes: { label: string; Icon: SvgIconComponent; id: number }[];
}

export default function GamesLayout({ navRoutes, children, activeRoute, handlerRouteChange }: GamesLayoutProps) {
  return (
    <main className={styles.layout}>
      <HeaderContainer position="relative" />

      <Fade>{children}</Fade>

      <nav>
        <BottomNavigation showLabels value={activeRoute}>
          {navRoutes
            .sort((a, b) => a.id - b.id)
            .map(({ label, Icon, id }) => (
              <BottomNavigationAction
                onClick={handlerRouteChange(id)}
                key={label}
                icon={<Icon fontSize="small" />}
                label={
                  <Typography mt={-0.1} fontSize=".6em" fontWeight="600" letterSpacing=".05em">
                    {label}
                  </Typography>
                }
              />
            ))}
        </BottomNavigation>
      </nav>
    </main>
  );
}
