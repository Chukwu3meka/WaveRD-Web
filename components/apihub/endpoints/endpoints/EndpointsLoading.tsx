import { EndpointsLoadingProps } from "interfaces/components/apihub.interface";
import { Avatar, Skeleton, Stack, Typography, Paper, Box, Grid, Divider } from "@mui/material";

const EndpointsLoading = ({ centered, items }: EndpointsLoadingProps) => (
  <Box maxWidth={900} p={1} sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} alignItems={centered ? "center" : "flex-start"}>
      {new Array(items).fill(" ").map((_, i) => (
        <Grid key={i} item sm={6} md={4} lg={4}>
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

            <Box my={2.5}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>

            <Divider variant="middle" sx={{ my: 1 }} />

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
              {new Array(3).fill(" ").map((_, i) => (
                <Stack direction="row" alignItems="center" key={i} spacing={0.2}>
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
