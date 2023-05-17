import { Stack } from "@mui/material";

import { Social } from ".";
import socialAccounts from "@source/constants/socialAccounts";

import { SocialContainer } from "@interface/components/shared/socialInterface";

export default ({ filterParams }: SocialContainer) => (
  <Stack direction="row" justifyContent="center">
    {socialAccounts
      .filter((acc) => filterParams.includes(acc.id))
      .map(({ title, id, href }) => (
        <Social key={id} account={title} link={href} />
      ))}
  </Stack>
);
