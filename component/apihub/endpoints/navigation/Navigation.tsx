import { Fragment } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";

export default function Navigation({ apis, showEndpoints, toggleShowEndpointsFn, getEndpoint }) {
  return (
    <List component="nav" aria-labelledby="nested-list-subheader" sx={{ width: "100%" }}>
      {apis.map(({ title, id, endpoints, icon }) => (
        <Fragment key={id}>
          <ListItemButton onClick={() => toggleShowEndpointsFn(id)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
            {showEndpoints[id] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={showEndpoints[id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {endpoints.map(({ title, id }) => (
                <ListItemButton key={id} sx={{ pl: 6 }}>
                  <ListItemText primary={title} onClick={() => getEndpoint(id)} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Fragment>
      ))}
    </List>
  );
}
