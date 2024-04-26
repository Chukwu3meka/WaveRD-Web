import { Endpoint } from "interfaces/components/apihub/endpoints.interface";
import { ApiResponse } from "./shared.interface";

type AllowedLimit = 3 | 10 | 20;

export interface GetEndpoints {
  page?: number;
  size: AllowedLimit;
  phrase?: string;
  category?: string;
  token?: null | string;
  sequence?: "next" | "prev";
  filter: "all" | "category" | "search";
}

export interface GetEndpointsResponse {
  size: AllowedLimit;
  page: number;
  content: Endpoint[];
  totalElements: number;
}

export interface GetEndpointsCategories {
  limit: AllowedLimit;
}
