"use client";

import { formatDistance, subDays } from "date-fns";

import Link from "next/link";
import dynamic from "next/dynamic";
import Ellipsis from "components/shared/ellipsis";
import InfiniteScroll from "react-infinite-scroll-component";

import { BookmarkAddOutlined } from "@mui/icons-material";
import { EndpointsViewProps } from "interfaces/components/apihub.interface";
import { Paper, Box, Grid, IconButton, Stack, Divider } from "@mui/material";
import { Update as LatencyIcon, Insights as LastUpdatedIcon, AutoAwesome as InsightsIcon } from "@mui/icons-material";
import { shortNumber } from "utils/helpers";

const EndpointsLoadingContainer = dynamic(() => import("./EndpointsLoadingContainer"));

const EndpointsView = ({ endpoints, refreshEndpoints, getMoreEndpoints, hasMoreEndpoints, alignment, limit }: EndpointsViewProps) => (
  <main>
    <InfiniteScroll
      pullDownToRefresh
      hasMore={hasMoreEndpoints}
      next={() => getMoreEndpoints()}
      pullDownToRefreshThreshold={50}
      dataLength={endpoints.content.length}
      refreshFunction={() => refreshEndpoints()}
      loader={<EndpointsLoadingContainer items={limit} />}
      endMessage={<p style={{ textAlign: "center" }}>Yay! You have seen it all</p>}
      // releaseToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>}
      // pullDownToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>}
    >
      <Box maxWidth={900} p={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems={alignment}>
          {endpoints.content.map(({ description, id, title, bookmarks, lastUpdated, latency }) => (
            <Grid key={id} item sm={2} md={4} lg={4}>
              <Paper elevation={2} sx={{ padding: 1 }}>
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
                  <Ellipsis lines={3} my={2.5} color="text.primary">
                    {description}
                  </Ellipsis>
                </Link>

                <Divider variant="middle" sx={{ my: 1 }} />

                <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={0.5} ml={-1}>
                  <Stack direction="row" alignItems="center">
                    <IconButton aria-label="Latency Icon">
                      <LatencyIcon fontSize="inherit" sx={{ fontSize: ".5em" }} />
                    </IconButton>

                    <Ellipsis lines={1} ml={-0.7} mb={-0.3} fontSize=".85em">
                      {`${latency}`.substring(1, 4)}s
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

                  <Stack direction="row" alignItems="center">
                    <IconButton aria-label="Insights Icon">
                      <InsightsIcon fontSize="inherit" sx={{ fontSize: ".5em" }} />
                    </IconButton>

                    <Ellipsis lines={1} ml={-0.7} mb={-0.3} fontSize=".85em">
                      {shortNumber(bookmarks)}
                    </Ellipsis>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </InfiniteScroll>
  </main>
);

export default EndpointsView;
