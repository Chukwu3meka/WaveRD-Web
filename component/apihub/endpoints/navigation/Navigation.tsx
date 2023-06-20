import { Fragment, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse, Box } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import FlagIcon from "@mui/icons-material/Flag";
import PublicIcon from "@mui/icons-material/Public";

export default function Navigation({ apis, showEndpoints, toggleShowEndpointsFn }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" sx={{ width: "100%" }}>
      {apis.map(({ label, id, endpoints, icon }) => (
        <Fragment key={id}>
          <ListItemButton onClick={() => toggleShowEndpointsFn(id)}>
            <ListItemIcon>{icon} </ListItemIcon>
            <ListItemText primary={label} />
            {showEndpoints[id] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={showEndpoints[id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {endpoints.map(({ label }) => (
                <ListItemButton key={label} sx={{ pl: 6 }}>
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  );
}
