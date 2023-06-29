import { Navigation } from "..";
import { Groups as ClubsIcon, SettingsAccessibility as PlayersIcon, EmojiEvents as CompetitionsIcon, Public as CountriesIcon } from "@mui/icons-material";

import fetcher from "@utils/fetcher";
import { useEffect, useState } from "react";

const staticApis = {
  "football-clubs": { title: "Football Clubs", icon: <ClubsIcon /> },
  "football-players": { title: "Football Players", icon: <PlayersIcon /> },
  "football-countries": { title: "Football Countries", icon: <CountriesIcon /> },
  "football-competitions": { title: "Football Competitions", icon: <CompetitionsIcon /> },
};

export default function NavigationContainer({ getEndpoint }) {
  const [apis, setApis] = useState([]);

  const [showEndpoints, setShowEndpoints] = useState({ "football-clubs": false, "football-players": false });

  const toggleShowEndpointsFn = (id) => {
    console.log(id);
    setShowEndpoints((showEndpoints) => ({ ...showEndpoints, [id]: !showEndpoints[id] }));
  };

  useEffect(() => {
    const getEndpointsByCategory = async () => {
      await fetcher({ endpoint: `/apihub/endpoints`, method: "GET" })
        .then(({ success, payload }) => {
          if (success) {
            for (const [category, endpoints] of Object.entries(payload))
              setApis((apis) =>
                [
                  ...apis,
                  staticApis[category]
                    ? {
                        endpoints,
                        id: category,
                        icon: staticApis[category].icon,
                        title: staticApis[category].title,
                      }
                    : [],
                ].flatMap((x) => x)
              );
          }
        })

        .catch((err) => {});
    };

    getEndpointsByCategory();
  }, []);

  return <Navigation apis={apis} showEndpoints={showEndpoints} getEndpoint={getEndpoint} toggleShowEndpointsFn={toggleShowEndpointsFn} />;
}
