import { ConsoleEndpointsContent } from "interfaces/components/console/apihub.interface";

export interface GetConsoleEndpointsPayload {
  page: number;
  size: number;
  filter: string;
  cookie?: string | null;
}

export interface GetConsoleEndpointsResponse {
  size: number;
  page: number;
  totalElements: number;
  content: ConsoleEndpointsContent[];
}
