import { KeyboardEventHandler, MouseEventHandler, RefObject } from "react";
import { GetConsoleEndpointResponse, GetConsoleEndpointsResponse, Snippets } from "interfaces/services/console.interface";
import { Theme } from "../others/layouts.interface";

export interface ConsoleEndpointsContainerProps {
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
  toggleShowEndpoint: Function;
  tableRef: RefObject<HTMLTableElement>;
  searchHandler: MouseEventHandler<HTMLButtonElement>;
}

export interface ConsoleEndpointContainerProps {
  theme?: Theme;
  endpoint: GetConsoleEndpointResponse | null;
}

interface FormData {
  method: { value: string; valid: boolean; info: string | null };
  snippet: { value: string; valid: boolean; info: string | null };
  category: { value: string; valid: boolean; info: string | null };

  path: { value: string; valid: boolean; info: string | null; validating?: boolean };
  title: { value: string; valid: boolean; info: string | null; validating?: boolean };
  description: { value: string; valid: boolean; info: string | null; validating?: boolean };

  options: { response: any; composing: boolean; latency: string | number; snippets: Snippets[] };
}

export interface ConsoleEndpointProps {
  theme: Theme;
  formData: FormData;
  onInputChange: Function;
  updateSnippet: Function;
  onSelectChange: Function;
  // onValueChange: React.FocusEvent<HTMLInputElement>;
}
