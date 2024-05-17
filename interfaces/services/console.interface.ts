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

export interface GetConsoleEndpointPayload {
  id: string;
  cookie?: string | null;
}

export interface GetConsoleEndpointResponse {
  snippets: Snippets[];
  title: string;
  latency: number;
  description: string;
  category: string;
  method: string;
  response: string;
  lastUpdated: Date;
  bookmarks: number;
  path: string;
  id: string;
}

export interface Snippets {
  id: string;
  title: string;
  snippet: string;
}

export interface ConsoleEndpointTitleExistsResponse {
  exists: boolean;
}
