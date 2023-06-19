import * as React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { styled, lighten, darken } from "@mui/system";

const GroupHeader = styled("div")(({ theme }) => ({
  top: "-8px",
  position: "sticky",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.mode === "light" ? lighten(theme.palette.primary.light, 0.85) : darken(theme.palette.primary.main, 0.7),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

export default function RenderGroup({ top100Films }) {
  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="With categories" />}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
}
