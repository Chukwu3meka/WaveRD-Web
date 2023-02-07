import { Drawer, Box, Stack, Typography } from "@mui/material";

import { styles } from ".";
import { IAppUIInformationProps } from "@interface/builder/information-interface";

const AppUIInformation = ({ information, closeDrawer }: IAppUIInformationProps) => (
  <Drawer anchor="right" open={!!information} onClose={() => closeDrawer()} className={styles.information}>
    <Box sx={{ minWidth: 450, padding: 1 }} role="presentation" onClick={() => closeDrawer()} onKeyDown={() => closeDrawer()}>
      {information?.map(({ label, data }, index) => (
        <Stack key={index}>
          <Typography
            sx={{
              fontSize: ".7em",
              fontWeight: 600,
              letterSpacing: ".05em",
              color: "#A39B9B",
              paddingTop: index !== 0 ? 1 : 0,
              borderTop: index !== 0 ? "1px solid #F5DCDC" : "",
            }}>
            {label}
          </Typography>
          <Typography
            sx={{
              ml: 3,
              fontSize: ".9em",
              fontWeight: 600,
              // marginBottom: -0.5,
            }}>
            {data}
          </Typography>
        </Stack>
      ))}
    </Box>
  </Drawer>
);

export default AppUIInformation;
