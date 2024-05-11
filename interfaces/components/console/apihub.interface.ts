import { GetConsoleEndpointsResponse } from "interfaces/services/console.interface";
import { MouseEventHandler, RefObject } from "react";

export interface EndpointsContainerProps {
  endpoints: GetConsoleEndpointsResponse | null;
}

export interface ConsoleEndpointsContent {
  title: string;
  latency: number;
  description: string;
  category: string;
  lastUpdated: Date;
  bookmarks: number;
  path: string;
  id: string;
}

export interface ConsoleEndpointsData {
  loading: boolean;
  page: number;
  rows: number;
  total: number;
  filter: string;
  content: ConsoleEndpointsContent[];
}

export interface ConsoleEndpointsProps {
  filter: string;
  searching: boolean;
  setFilter: Function;
  data: ConsoleEndpointsData;
  handlePageChange: Function;
  toggleViewRequest: Function;
  tableRef: RefObject<HTMLTableElement>;
  searchHandler: MouseEventHandler<HTMLButtonElement>;
}
