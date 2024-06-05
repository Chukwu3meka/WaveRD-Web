import { Avatar, Skeleton, Stack, Typography } from "@mui/material";

const CategoriesLoading = () =>
  new Array(5).map((_, i) => (
    <Stack direction="row" alignItems="center" gap={2} mb={2} key={i}>
      <Skeleton variant="circular">
        <Avatar sx={{ width: 25, height: 25 }} />
      </Skeleton>
      <Skeleton width="100%">
        <Typography fontSize="1.5em">.</Typography>
      </Skeleton>
    </Stack>
  ));

export default CategoriesLoading;
