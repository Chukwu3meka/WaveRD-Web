"use server";

// import { styles } from ".";
import { Fragment, Suspense } from "react";
import { EndpointsMenuProps } from "interfaces/components/apihub.interface";
import { List, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
// import { Groups,  EmojiEvents, Public, ForkLeft } from "@mui/icons-material";
// import { Groups, SettingsAccessibility, EmojiEvents, Public, ForkLeft } from "@mui/icons-material";
import { unstable_noStore } from "next/cache";
import apihubService from "services/apihub.service";
import { ApiResponse } from "interfaces/services/shared.interface";
import Link from "next/link";
import dynamic from "next/dynamic";

import Icon from "@mui/material/Icon";

// const CategoryIcon = ({ icon }: any) => {
//   console.log({ icon });

//   if (icon) {
//     const Icon = dynamic(() => import(`@mui/icons-material/${icon}`), {
//       loading: () => <p>Loading...</p>,
//       ssr: false,
//     });

//     return <Icon />;
//   }

//   return <></>;
// };

const EndpointsMenu = async () => {
  const endpoints = await apihubService
    .getEndpointsCategories({ limit: 10 })
    .then(({ success, data }: ApiResponse) => {
      if (success && Array.isArray(data)) return data;
      return [];
    })
    .catch(() => []);

  // const getEndpointsCategories = async () => {
  //   "use server";

  //   return (await apihubService
  //     .getEndpointsCategories({ limit: 10 })
  //     .then(({ success, data }: ApiResponse) => {
  //       if (success && Array.isArray(data)) return data;
  //       return [];
  //     })
  //     .catch(() => [])) as [];
  // };

  console.log({ endpoints });

  return endpoints.map(({ title, _id, icon }) => {
    // const Icon = dynamic(() => import(` @mui/icons-material/${icon}`));
    // const Icon = Muicon[icon];

    return (
      <Link href={_id} key={_id}>
        <List component="nav" aria-labelledby="nested-list-subheader" sx={{ width: "100%" }}>
          <ListItemButton>
            <ListItemIcon>
              {/* <CategoryIcon icon={icon} /> */}
              <Icon>{icon}</Icon>

              {/* <IconComp icon={icon} /> */}

              {/* <Icon color="secondary" /> */}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        </List>
      </Link>
    );
  });
};

export default EndpointsMenu;
