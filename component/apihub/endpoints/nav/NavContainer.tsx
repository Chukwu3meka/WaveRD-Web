import { Nav } from "..";

import { Groups as GroupsIcon, SettingsAccessibility as SettingsAccessibilityIcon } from "@mui/icons-material";
import { useState } from "react";

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlagIcon from "@mui/icons-material/Flag";
import PublicIcon from "@mui/icons-material/Public";

export default function NavContainer() {
  const apis = [
    {
      id: "footballClubs",
      label: "Football Clubs",
      icon: <GroupsIcon />,
      endpoints: [
        { label: "Get Clubs", id: "get-clubs" },
        { label: "Get Clubs by ID", id: "get-clubs-by-id" },
        { label: "Search Club", id: "search-clubs" },
      ],
    },
    {
      id: "footballPlayers",
      label: "Football Players",
      icon: <SettingsAccessibilityIcon />,
      endpoints: [
        { label: "Get Players", id: "get-players" },
        { label: "Get Players by ID", id: "get-players-by-id" },
        { label: "Search Player", id: "search-players" },
      ],
    },
    {
      id: "footballCompetitions",
      label: "Football Competitions",
      icon: <EmojiEventsIcon />,
      endpoints: [],
    },
    {
      id: "footballCountries",
      label: "Football Countries",
      icon: <PublicIcon />,
      endpoints: [],
    },
  ];

  const [showEndpoints, setShowEndpoints] = useState({
    footballClubs: false,
    footballPlayers: false,
  });

  const toggleShowEndpointsFn = (id) => {
    setShowEndpoints((showEndpoints) => ({ ...showEndpoints, [id]: !showEndpoints[id] }));
  };

  return <Nav apis={apis} showEndpoints={showEndpoints} toggleShowEndpointsFn={toggleShowEndpointsFn} />;
}
