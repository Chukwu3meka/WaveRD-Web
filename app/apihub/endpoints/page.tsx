import { Metadata } from "next";
import { ApiResponse } from "interfaces/services/shared.interface";

import pageInfo from "utils/page-info";
import apihubService from "services/apihub.service";
import ComingSoonContainer from "components/shared/coming-soon";
import EndpointsEntry from "components/apihub/endpoints/EndpointsEntry";

export const metadata: Metadata = {
  title: pageInfo.home.title,
  keywords: pageInfo.home.keywords,
  description: pageInfo.home.description,
};

export default function EndpointsPage() {
  const getEndpointsCategories = async () => {
    "use server";

    return (await apihubService
      .getEndpointsCategories({ limit: 10 })
      .then(({ success, data }: ApiResponse) => {
        if (success && Array.isArray(data)) return data;
        return [];
      })
      .catch(() => [])) as [];
  };

  return process.env.NODE_ENV === "production" ? (
    <ComingSoonContainer header={true} finishDate={new Date("13 May 2024")} />
  ) : (
    <EndpointsEntry />
  );
}
