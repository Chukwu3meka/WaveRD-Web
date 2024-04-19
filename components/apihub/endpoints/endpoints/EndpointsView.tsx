"use client";

import Link from "next/link";
import Ellipsis from "components/shared/ellipsis";
import stylesVariables from "styles/variables.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";

import { formatDistance } from "date-fns";
import { shortNumber } from "utils/helpers";
import { BookmarkAddOutlined } from "@mui/icons-material";
import { EndpointsViewProps } from "interfaces/components/apihub.interface";
import { Box, Grid, IconButton, Stack, Divider, CircularProgress } from "@mui/material";
import { Update as LatencyIcon, Insights as LastUpdatedIcon, AutoAwesome as InsightsIcon } from "@mui/icons-material";

const EndpointsView = ({ endpoints, refreshEndpoints, getMoreEndpoints, hasMoreEndpoints, centered, breakpoint }: EndpointsViewProps) => (
  <InfiniteScroll
    pullDownToRefresh
    hasMore={hasMoreEndpoints}
    next={() => getMoreEndpoints()}
    pullDownToRefreshThreshold={50}
    dataLength={endpoints.content.length}
    refreshFunction={() => refreshEndpoints()}
    loader={
      <Box display="flex" justifyContent="center" mb={2} mt={5} maxWidth={["xl"].includes(breakpoint) ? 1200 : 900} p={1}>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={stylesVariables.secondaryColor as string} />
              <stop offset="50%" stopColor={stylesVariables.primaryColor as string} />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} />
      </Box>
    }
    endMessage={<p style={{ textAlign: "center" }}>Yay! You have seen it all</p>}>
    <Box display="flex" justifyContent={centered ? "center" : "flex-start"}>
      <Box maxWidth={["xl"].includes(breakpoint) ? 1200 : 900} p={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {endpoints.content.map(({ description, id, title, bookmarks, lastUpdated, latency, category }) => (
            <Grid key={id} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <div style={{ padding: 10, borderRadius: 10, border: "2px solid var(--secondary-color)" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Link href={`/apihub/endpoints/${id}`}>
                    <Ellipsis lines={1} fontWeight={600} textTransform="capitalize" fontSize="1.3em" color="text.secondary">
                      {title}
                    </Ellipsis>
                  </Link>

                  <IconButton aria-label="Bookmark Icon">
                    <BookmarkAddOutlined fontSize="inherit" sx={{ fontSize: ".8em" }} />
                  </IconButton>
                </Stack>

                <Divider variant="inset" />

                <Link href={`/apihub/endpoints/${id}`}>
                  <Ellipsis lines={3} color="text.primary" mt={2.5}>
                    {description}
                  </Ellipsis>
                </Link>

                <Divider variant="middle" sx={{ mt: 2.5, mb: 1 }} />

                <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={0.5} ml={-1}>
                  <Stack direction="row" alignItems="center">
                    <IconButton aria-label="Latency Icon">
                      <LatencyIcon fontSize="inherit" sx={{ fontSize: ".5em" }} />
                    </IconButton>

                    <Ellipsis lines={1} ml={-0.7} mb={-0.3} fontSize=".85em">
                      {`${latency}`.substring(0, 4)}s
                    </Ellipsis>
                  </Stack>

                  <Stack direction="row" alignItems="center">
                    <IconButton aria-label="Insights Icon">
                      <InsightsIcon fontSize="inherit" sx={{ fontSize: ".5em" }} />
                    </IconButton>

                    <Ellipsis lines={1} ml={-0.7} mb={-0.3} fontSize=".85em">
                      {shortNumber(bookmarks)}
                    </Ellipsis>
                  </Stack>

                  <Stack direction="row" alignItems="center">
                    <IconButton aria-label="LastUpdated Icon">
                      <LastUpdatedIcon fontSize="inherit" sx={{ fontSize: ".5em" }} />
                    </IconButton>

                    <Ellipsis lines={1} ml={-0.7} mb={-0.3} fontSize=".85em">
                      {formatDistance(new Date(lastUpdated), new Date(), { addSuffix: true })}
                    </Ellipsis>
                  </Stack>
                </Stack>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  </InfiniteScroll>
);

export default EndpointsView;
