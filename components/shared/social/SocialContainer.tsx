import { Social } from ".";
import { Stack } from "@mui/material";
import { SOCIAL_ACCOUNTS } from "utils/constants";

import { SocialContainerProps } from "interfaces/components/shared.interface";

const SocialContainer = ({ filterParams, fontSize = "18px" }: SocialContainerProps) => (
  <Stack direction="row" justifyContent="center">
    {SOCIAL_ACCOUNTS.filter((acc) => filterParams.includes(acc.id)).map(({ title, id, href }) => (
      <Social key={id} account={title} link={href} fontSize={fontSize} />
    ))}
  </Stack>
);

export default SocialContainer;
