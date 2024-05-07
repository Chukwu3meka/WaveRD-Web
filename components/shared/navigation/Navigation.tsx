import Link from "next/link";
import Ellipsis from "../ellipsis";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import { styles } from ".";
import { Paper, Stack } from "@mui/material";
import { NavigationProps } from "interfaces/components/others/shared.interface";

const Navigation = ({ routes }: NavigationProps) => (
  <main className={styles.navigation}>
    {routes?.map(({ Icon, path, title }, i) => (
      <Link href={path} key={i}>
        <Paper key={path} elevation={2} sx={{ borderRadius: 1.5 }}>
          <Stack padding={1} height={120} width={180} justifyContent="center" alignItems="center">
            {Icon ? <Icon fontSize="medium" color="disabled" /> : <ShuffleIcon fontSize="medium" color="disabled" />}
            <Ellipsis lines={2} fontSize=".82em" fontWeight={700} textAlign="center" mt={1}>
              {title}
            </Ellipsis>
          </Stack>
        </Paper>
      </Link>
    ))}
  </main>
);

export default Navigation;
