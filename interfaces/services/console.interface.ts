export interface GetEndpointsPayload {
  page: number;
  size: number;
  filter: string;
  cookie?: string | null;
}
export type GetDailyStatPayload = GetEndpointsPayload;
export type GetAllRequestsPayload = GetEndpointsPayload;
export type GetFailedRequestsPayload = GetEndpointsPayload;

export interface DailyStatResponse {
  _id: string;
  date: string;
  accounts: number;
  apihub: number;
  console: number;
  info: number;
  manager: number;
}

export interface FailedRequestsResponse {
  id: string;
  date: Date;
  time: Date;
  error: { message: string };
  // data: { auth: { id: string; session: string } };
  data: { auth: { id: string; session: string } };
  request: { endpoint: string; version: string; domain: string; path: string };
}

export interface AllRequestsResponse {
  time: Date;
  domain: string;
  version: string;
  path: string;
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
  title: string;
  code: string;
}

export interface ConsoleEndpointTitleExistsResponse {
  exists: boolean;
}

export interface ConsoleComposeEndpoint {
  response: any;
  latency: string;
}

export interface SaveEndpointPayload {
  id: string;
  path: string;
  title: string;
  method: string;
  category: string;
  snippets: Snippets[];
  description: string;
}

export interface GetGameWorldsResponse {
  ref: string;
  title: string;
  created: string;
  totalUnmanaged: number;
}

export interface ConsoleData<K> {
  loading: boolean;
  page: number;
  rows: number;
  total: number;
  filter: string;
  content: K[];
}
