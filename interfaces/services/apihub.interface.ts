import { Endpoint } from "interfaces/components/apihub.interface";
import { ApiResponse } from "./shared.interface";

export interface GetEndpoints {
  page?: number;
  size: 3 | 20;
  phrase?: string;
  category?: string;
  token?: null | string;
  sequence?: "next" | "prev";
  filter: "all" | "category" | "search";
}

export interface GetEndpointsResponse {
  size: 3 | 20;
  page: number;
  content: Endpoint[];
  totalElements: number;
}
