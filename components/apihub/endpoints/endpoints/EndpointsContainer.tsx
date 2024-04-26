"use client";

import ApihubService from "services/apihub.service";

import { EndpointsLoadingContainer, EndpointsView } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { BREAKPOINTS } from "utils/constants";
import { setEndpointsParamAction } from "redux-store/actions";
import { RootState } from "interfaces/redux-store/store.interface";
import { LayoutState } from "interfaces/redux-store/layout.interfaces";
import { GetEndpointsResponse } from "interfaces/services/apihub.interface";
import { EndpointsContainerProps } from "interfaces/components/apihub/endpoints.interface";
import { sleep } from "utils/helpers";

const EndpointsContainer = (props: EndpointsContainerProps) => {
  const apihubService = new ApihubService();

  const { limit, setEndpointsParamAction } = props,
    [ready, setReady] = useState(false),
    [centered, setCentered] = useState(false),
    [refreshing, setRefreshing] = useState(false),
    [hasMoreEndpoints, setHasMoreEndpoints] = useState(false),
    initEndpoints = { content: [], page: 0, size: limit, totalElements: 0 },
    [breakpoint, setBreakpoint] = useState<LayoutState["breakpoint"]>("xs"),
    [endpoints, setEndpoints] = useState<GetEndpointsResponse>(initEndpoints),
    [endpointsParam, setEndpointsParam] = useState({ filter: "all", phrase: "" });

  useEffect(() => {
    if (ready && props.endpointsParam) {
      const { filter, phrase } = props.endpointsParam;

      refreshEndpoints({ filter, phrase });
      setEndpointsParam({ filter, phrase });
    }
  }, [props.endpointsParam]);

  useEffect(() => {
    if (!ready) {
      setReady(true);
      setEndpoints(props.endpoints);
      setHasMoreEndpoints(!!props.endpoints.content.length);
    }
  }, [props.endpoints]);

  useEffect(() => {
    if (props.deviceWidth) setCentered(props.deviceWidth < BREAKPOINTS.lg);
  }, [props.deviceWidth]);

  useEffect(() => {
    if (props.breakpoint) setBreakpoint(props.breakpoint);
  }, [props.breakpoint]);

  const getMoreEndpoints = async () => {
    await sleep(1000);
    const moreEndpoints: GetEndpointsResponse = await (endpointsParam.filter === "category"
      ? apihubService.getEndpoints({ filter: "category", size: limit, page: endpoints.page + 1, category: endpointsParam.phrase })
      : endpointsParam.filter === "search"
      ? apihubService.getEndpoints({
          size: limit,
          filter: "search",
          sequence: "next",
          phrase: endpointsParam.phrase,
          token: endpoints.content[endpoints.content.length - 1].paginationToken,
        })
      : apihubService.getEndpoints({ filter: "all", size: limit, page: endpoints.page + 1 })
    )

      // await apihubService
      //   .getEndpoints({ filter: "all", size: limit, page: endpoints.page + 1 })

      .then(({ success, data }) => {
        if (success && data && Array.isArray(data.content)) return data;
        return { ...initEndpoints, page: endpoints.page, size: limit };
      })
      .catch(() => ({ ...initEndpoints, page: endpoints.page, size: limit }));

    const newContent = [...endpoints.content, ...moreEndpoints.content];

    setEndpoints({ ...moreEndpoints, content: newContent });
    setHasMoreEndpoints(moreEndpoints.totalElements > newContent.length);
  };

  const refreshEndpoints = async ({ filter = "all", phrase = "" }) => {
    setRefreshing(true);

    await apihubService.cancelGetEndpoints();
    await apihubService.updateGetEndpointsSource();

    setEndpoints(initEndpoints);

    const freshEndpoints: GetEndpointsResponse = await (filter === "category"
      ? apihubService.getEndpoints({ filter: "category", size: limit, page: 0, category: phrase })
      : filter === "search"
      ? apihubService.getEndpoints({ filter: "search", size: limit, phrase, sequence: "next", token: "null" })
      : apihubService.getEndpoints({ filter: "all", size: limit, page: 0 })
    )
      .then(({ success, data }) => {
        if (success && data && Array.isArray(data.content)) return data;
        return { page: 0, size: limit, totalElements: 0, content: [] };
      })
      .catch(() => ({ page: 0, size: limit, totalElements: 0, content: [] }));

    setRefreshing(false);
    setEndpoints(freshEndpoints);
    setHasMoreEndpoints(freshEndpoints.totalElements > freshEndpoints.content.length);
  };

  return refreshing ? (
    <EndpointsLoadingContainer items={limit} />
  ) : (
    <EndpointsView
      centered={centered}
      endpoints={endpoints}
      breakpoint={breakpoint}
      hasMoreEndpoints={hasMoreEndpoints}
      refreshEndpoints={refreshEndpoints}
      getMoreEndpoints={getMoreEndpoints}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    endpointsParam: state.endpoints,
    breakpoint: state.layout.breakpoint,
  }),
  mapDispatchToProps = { setEndpointsParamAction };

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
