import { Stack } from "@mui/material";

import { Social } from ".";
import { SocialContainer } from "interfaces/components/shared.interface";
import { SOCIAL_ACCOUNTS } from "utils/constants";

export default ({ filterParams, fontSize = "18px" }: SocialContainer) => (
  <Stack direction="row" justifyContent="center">
    {SOCIAL_ACCOUNTS.filter((acc) => filterParams.includes(acc.id)).map(({ title, id, href }) => (
      <Social key={id} account={title} link={href} fontSize={fontSize} />
    ))}
  </Stack>
);
