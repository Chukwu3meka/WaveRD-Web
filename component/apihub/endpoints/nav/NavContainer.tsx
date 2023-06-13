import { Nav } from "..";

import { Groups as GroupsIcon, SettingsAccessibility as SettingsAccessibilityIcon } from "@mui/icons-material";

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
      id: "footballClubs",
      label: "Football Clubs",
      icon: <SettingsAccessibilityIcon />,
      endpoints: [
        { label: "Get Clubs", id: "get-clubs" },
        { label: "Get Clubs by ID", id: "get-clubs-by-id" },
        { label: "Search Club", id: "search-clubs" },
      ],
    },
  ];

  return <Nav apis={apis} />;
}
