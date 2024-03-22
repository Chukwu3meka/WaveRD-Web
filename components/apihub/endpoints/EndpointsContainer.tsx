// "use client";

import { connect } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { RootState } from "interfaces/redux-store/store.interface";
import { Endpoints } from ".";
import { EndpointsContainerProps } from "interfaces/components/apihub.interface";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import apihubService from "services/apihub.service";
import { ApiResponse } from "interfaces/services/shared.interface";
import { AxiosError } from "axios";
import Loading from "components/shared/loading";
import { GetEndpoints } from "interfaces/services/apihub.interface";
import dynamic from "next/dynamic";
import { unstable_noStore } from "next/cache";
// import { unstable_serialize as useSWR } from "swr"; // ✅ Available in server components

// const getEndpoints = async ({ phrase, sequence, token }: GetEndpoints): Promise<[]> => {

// async function getEndpoints(): Promise<[]> {

// async function getEndpoints() {
//   // return await apihubService.getEndpoints({ limit: 30, phrase, sequence, token });

//   const a = await apihubService.getEndpoints({ limit: 30, phrase: "football", sequence: "next", token: "initial" });
//   // phrase: string, token: string | "initial", sequence: "next" | "prev", limit: 3 | 30
//   // .then(async ({ data, success }) => {
//   //   if (success) return data;
//   //   return [];
//   // })
//   // .catch(() => []);

//   return a;
// }

const EndpointsContainer = async () => {
  console.log("{ endpoints }");

  // const endpoints = getEndpoints({ phrase: "football", sequence: "next", token: "initial" });
  // const endpoints = await getEndpoints();

  const endpoints = await apihubService.getEndpoints({ limit: 30, phrase: "football", sequence: "next", token: "initial" });

  // .then(async ({ data, success }) => {
  //   if (success) return data;
  //   return [];
  // })
  // .catch(() => []);

  // const { endpoints, error, isLoading } = useSWR("getEndpoints", () =>
  //   apihubService.getEndpoints({ limit: 30, phrase: "", sequence: "", token: "" })
  // );

  console.log({ endpoints });

  // const [loading, setLoading] = useState(false),
  //   [endpoints, setEndpoints] = useState<[]>([]),
  //   [showMenu, setShowMenu] = useState((props.deviceWidth || 0) > 900),
  //   [displayHeader, setDisplayHeader] = useState(!!props.displayHeader);

  // useEffect(() => {
  //   setShowMenu(props.deviceWidth > 900);
  // }, [props.deviceWidth]);

  // useEffect(() => {
  //   setDisplayHeader(props.displayHeader);
  // }, [props.displayHeader]);

  // const getEndpointsByCategory = async (reference: string) => {
  //   setLoading(true);

  //   await apihubService
  //     .getEndpointsCategories(reference)
  //     .then(({ success, data }: ApiResponse) => {
  //       if (success && Array.isArray(data)) setEndpoints(data);
  //     })
  //     .catch(() => setEndpoints([]))
  //     .finally(() => setLoading(false));
  // };

  return (
    // <Suspense fallback={<p>Loading feed...</p>}>
    // {/* // <Endpoints endpoints={endpoints} /> */}
    <p>dogs</p>
    // {/* endpoints?.map((x) => <p>z</p>) */}
    // {/* </Suspense> */}
  );
};

export default EndpointsContainer;
