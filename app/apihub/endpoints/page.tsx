import { Metadata } from "next";

import pageInfo from "utils/page-info";
// import EndpointsContainer from "components/apihub/a";
import ComingSoonContainer from "components/shared/coming-soon";
import apihubService from "services/apihub.service";
import { Category } from "interfaces/components/apihub.interface";
import { Suspense, lazy } from "react";
import EndpointsContainer from "components/apihub/endpoints";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

// const DynamicHeader = dynamic(() => import("components/apihub/endpoints"), {
//   loading: () => <p>Loading...</p>,
// });

// const EndpointsContainer = lazy(() => import("components/apihub/endpoints"));

// const getEndpointsCategories = async (): Promise<Category[]> => {
//   return await apihubService
//     .getEndpointsCategories()
//     .then(async ({ data, success }) => {
//       if (success) return data;
//       return [];
//     })
//     .catch(() => []);
// };

// const getEndpoints = async (): Promise<[]> => {
//   return await apihubService
//     .getEndpoints({ limit: 30, phrase: "", sequence: "next", token: "initial" })
//     // phrase: string, token: string | "initial", sequence: "next" | "prev", limit: 3 | 30
//     .then(async ({ data, success }) => {
//       if (success) return data;
//       return [];
//     })
//     .catch(() => []);
// };

export default function EndpointsPage() {
  // const endpoints: [] = await getEndpoints(),
  //   categories: Category[] = await getEndpointsCategories();

  // console.log({ endpoints, categories });

  return process.env.NODE_ENV === "production" ? (
    <ComingSoonContainer header={true} finishDate={new Date("13 May 2024")} />
  ) : (
    <div>
      <p>dsfsdfd</p>

      <span>sadsdsa</span>

      {/* // const ComponentB = dynamic(() => import("../components/B"));
// const { GoogleAnalytics } = dynamic(() => import("@next/third-parties/google"));
// const GoogleAnalytics = dynamic(() => import("@next/third-parties/google").then(({ GoogleAnalytics }) => GoogleAnalytics));
// const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights)); */}

      <Suspense fallback={<p>loading........</p>}>
        <EndpointsContainer />
      </Suspense>
    </div>
  );
}
