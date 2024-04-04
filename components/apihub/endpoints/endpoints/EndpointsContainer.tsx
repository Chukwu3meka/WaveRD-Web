"use client";

import { EndpointsView } from ".";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { EndpointsContainerProps, Category, Endpoint, EndpointsViewProps } from "interfaces/components/apihub.interface";
import { setEndpointsAction } from "redux-store/actions";
import { GetEndpointsResponse } from "interfaces/services/apihub.interface";
import apihubService from "services/apihub.service";

const EndpointsContainer = (props: EndpointsContainerProps) => {
  const { limit, deviceWidth = 0 } = props,
    [hasMoreEndpoints, setHasMoreEndpoints] = useState(false),
    [endpoints, setEndpoints] = useState<GetEndpointsResponse>({ content: [], page: 0, size: limit, totalElements: 0 }),
    [alignment, setAlignment] = useState<EndpointsViewProps["alignment"]>(deviceWidth > 900 ? "flex-end" : "center");

  useEffect(() => {
    setEndpoints(props.initEndpoints);
    setHasMoreEndpoints(!!props.initEndpoints.content.length);
  }, [props.initEndpoints]);

  useEffect(() => {
    if (props.deviceWidth) setAlignment(props.deviceWidth > 900 ? "flex-end" : "center");
  }, [props.deviceWidth]);

  const getMoreEndpoints = async () => {
    const moreEndpoints: GetEndpointsResponse = await apihubService
      .getEndpoints({ filter: "all", size: limit, page: endpoints.page + 1 })
      .then(({ success, data }) => {
        if (success && data && Array.isArray(data.content)) return data;
        return { page: endpoints.page, size: limit, totalElements: 0, content: [] };
      })
      .catch(() => ({ page: endpoints.page, size: limit, totalElements: 0, content: [] }));

    const newContent = [...endpoints.content, ...moreEndpoints.content];

    setEndpoints({ ...moreEndpoints, content: newContent });
    setHasMoreEndpoints(moreEndpoints.totalElements > newContent.length);
  };

  const refreshEndpoints = async () => {
    // ? Reset endpoints
    setEndpoints({ content: [], page: 0, size: limit, totalElements: 0 });

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
      limit={limit}
      endpoints={endpoints}
      alignment={alignment}
      hasMoreEndpoints={hasMoreEndpoints}
      refreshEndpoints={refreshEndpoints}
      getMoreEndpoints={getMoreEndpoints}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
  }),
  mapDispatchToProps = { setEndpointsAction };

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
