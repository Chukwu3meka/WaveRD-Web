import { styles } from ".";
import { Fragment } from "react";
import { EndpointsMenuProps } from "interfaces/components/apihub.interface";
import { List, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { Groups, SettingsAccessibility, EmojiEvents, Public, ForkLeft } from "@mui/icons-material";

const staticMenuList = [
  { title: "Football Countries", Icon: Public, reference: "football-countries" },
  { title: "Football Clubs", Icon: Groups, reference: "football-clubs" },
  { title: "Football Players", Icon: SettingsAccessibility, reference: "football-players" },
  { title: "Football Competitions", Icon: EmojiEvents, reference: "football-competitions" },
  { title: "Football Referees", Icon: ForkLeft, reference: "football-referees" },
];

const EndpointsMenu = ({ getEndpointsByCategory, displayHeader }: EndpointsMenuProps) => (
  <div className={styles["endpoints-menu"]} style={{ top: displayHeader ? "var(--headerHeight)" : "-10px" }}>
    <List component="nav" aria-labelledby="nested-list-subheader" sx={{ width: "100%" }}>
      {staticMenuList.map(({ title, reference, Icon }) => (
        <Fragment key={title}>
          <ListItemButton onClick={() => getEndpointsByCategory(reference)}>
            <ListItemIcon>
              <Icon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        </Fragment>
      ))}
    </List>
  </div>
);

export default EndpointsMenu;
