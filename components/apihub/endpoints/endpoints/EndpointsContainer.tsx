"use client";

import apihubService from "services/apihub.service";

import { EndpointsView } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { BREAKPOINTS } from "utils/constants";
import { setEndpointsAction } from "redux-store/actions";
import { RootState } from "interfaces/redux-store/store.interface";
import { LayoutState } from "interfaces/redux-store/layout.interfaces";
import { GetEndpointsResponse } from "interfaces/services/apihub.interface";
import { EndpointsContainerProps } from "interfaces/components/apihub.interface";

const EndpointsContainer = (props: EndpointsContainerProps) => {
  const { limit } = props,
    [centered, setCentered] = useState(false),
    [hasMoreEndpoints, setHasMoreEndpoints] = useState(false),
    initEndpoints = { content: [], page: 0, size: limit, totalElements: 0 },
    [breakpoint, setBreakpoint] = useState<LayoutState["breakpoint"]>("xs"),
    [endpoints, setEndpoints] = useState<GetEndpointsResponse>(initEndpoints);

  // useEffect(() => {
  //   if (endpoints.content.length) {
  //     // endpointsFilter: state.apihub.endpoints.filter,
  //     // endpointsPhrase: state.apihub.endpoints.Phrase,
  //   }
  // }, [props.endpointsFilter, props.endpointsPhrase]);

  useEffect(() => {
    if (props.endpoints) {
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
    const moreEndpoints: GetEndpointsResponse = await apihubService
      .getEndpoints({ filter: "all", size: limit, page: endpoints.page + 1 })
      .then(({ success, data }) => {
        if (success && data && Array.isArray(data.content)) return data;
        return { ...initEndpoints, page: endpoints.page, size: limit };
      })
      .catch(() => ({ ...initEndpoints, page: endpoints.page, size: limit }));

    const newContent = [...endpoints.content, ...moreEndpoints.content];

    setEndpoints({ ...moreEndpoints, content: newContent });
    setHasMoreEndpoints(moreEndpoints.totalElements > newContent.length);
  };

  const refreshEndpoints = async () => {
    setEndpoints(initEndpoints);

    const freshEndpoints: GetEndpointsResponse = await apihubService
      .getEndpoints({ filter: "all", size: limit, page: 0 })
      .then(({ success, data }) => {
        if (success && data && Array.isArray(data.content)) return data;
        return { page: 0, size: limit, totalElements: 0, content: [] };
      })
      .catch(() => ({ page: 0, size: limit, totalElements: 0, content: [] }));

    setEndpoints(freshEndpoints);
    setHasMoreEndpoints(freshEndpoints.totalElements > freshEndpoints.content.length);
  };

  return (
    <EndpointsView
      endpoints={endpoints}
      centered={centered}
      breakpoint={breakpoint}
      hasMoreEndpoints={hasMoreEndpoints}
      refreshEndpoints={refreshEndpoints}
      getMoreEndpoints={getMoreEndpoints}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    breakpoint: state.layout.breakpoint,
    endpointsFilter: state.apihub.endpoints.filter,
    endpointsPhrase: state.apihub.endpoints.Phrase,
  }),
  mapDispatchToProps = { setEndpointsAction };

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
