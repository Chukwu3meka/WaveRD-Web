import { EndpointsLoadingProps } from "interfaces/components/apihub.interface";
import { Avatar, Skeleton, Stack, Typography, Paper, Box, Grid, Divider } from "@mui/material";

const EndpointsLoading = ({ centered, items }: EndpointsLoadingProps) => (
  <Box p={1} sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} maxWidth={900} margin={centered ? "auto" : 0}>
      {new Array(items).fill(" ").map((_, i) => (
        <Grid key={i} item sm={2} md={3} lg={4}>
          <Paper sx={{ padding: 1, width: "100%" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Skeleton width="100%">
                <Typography fontSize="1.5em">.</Typography>
              </Skeleton>

              <Skeleton variant="circular">
                <Avatar sx={{ width: 25, height: 25 }} />
              </Skeleton>
            </Stack>

            <Divider variant="inset" />

            <Box my={3}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>

            <Divider variant="middle" sx={{ my: 1 }} />

            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={1} ml={-1}>
              {new Array(3).fill(" ").map((_, i) => (
                <Stack direction="row" alignItems="center" key={i} spacing={0.4}>
                  <Skeleton variant="circular">
                    <Avatar sx={{ width: 10, height: 10 }} />
                  </Skeleton>

                  <Skeleton width="50px">
                    <Typography fontSize=".5em">.</Typography>
                  </Skeleton>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default EndpointsLoading;
