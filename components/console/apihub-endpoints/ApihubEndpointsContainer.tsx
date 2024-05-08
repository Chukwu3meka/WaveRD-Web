"use client";

import { ApihubEndpointsView } from ".";

const ApihubEndpointsContainer = ({ endpoints }: any) => {
  console.log(endpoints);

  return <ApihubEndpointsView endpoints={endpoints} />;
};

export default ApihubEndpointsContainer;
