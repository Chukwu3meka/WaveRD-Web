import { Nav } from "..";

import { Groups as ClubsIcon, SettingsAccessibility as PlayersIcon, EmojiEvents as CompetitionsIcon, Public as CountriesIcon } from "@mui/icons-material";
import { useState } from "react";

import * as React from "react";

export default function NavContainer() {
  const apis = [
    {
      id: "footballClubs",
      label: "Football Clubs",
      icon: <ClubsIcon />,
      endpoints: [
        { label: "Get Clubs", id: "get-clubs" },
        { label: "Get Clubs by ID", id: "get-clubs-by-id" },
        { label: "Search Club", id: "search-clubs" },
      ],
    },
    {
      id: "footballPlayers",
      label: "Football Players",
      icon: <PlayersIcon />,
      endpoints: [],
    },
    {
      id: "footballCompetitions",
      label: "Football Competitions",
      icon: <CompetitionsIcon />,
      endpoints: [],
    },
    {
      id: "footballCountries",
      label: "Football Countries",
      icon: <CountriesIcon />,
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
