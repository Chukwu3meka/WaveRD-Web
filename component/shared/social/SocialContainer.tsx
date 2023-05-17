import { Stack } from "@mui/material";

import socialAccounts from "@source/constants/socialAccounts";
import { Social } from ".";

export default ({ filterParams }: { filterParams: string[] }) => (
  <Stack direction="row" justifyContent="center">
    {socialAccounts
      .filter((acc) => filterParams.includes(acc.id))
      .map(({ title, id, href }) => (
        <Social key={id} account={title} link={href} />
      ))}
  </Stack>
);
