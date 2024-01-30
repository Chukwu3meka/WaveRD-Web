import { styles } from ".";
import { Error } from "@mui/icons-material";
import { Typography, Stack } from "@mui/material";

import { NotFoundProps } from "interfaces/components/shared.interface";

const NotFound = ({ height }: NotFoundProps) => {
  return (
    <Stack alignItems="center" className={styles["not-found"]} style={{ height: height ?? "calc(var(--visibleScreen) - var(--headerHeight))" }}>
      <Error fontSize="large" />
      <Typography component="h3" fontSize="2em">
        Data Not Found
      </Typography>
      <Typography color="text.secondary" fontSize="1.2em">
        Sorry, the requested data could not be found.
      </Typography>
    </Stack>
  );
};

export default NotFound;
