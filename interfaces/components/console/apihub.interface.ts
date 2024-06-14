import { Theme } from "../others/layouts.interface";
import { MouseEventHandler, RefObject } from "react";
import { GetConsoleEndpointResponse, Snippets } from "interfaces/services/console.interface";

export interface ConsoleEndpointsContent {
  title: string;
  latency: number;
  description: string;
  category: string;
  lastUpdated: Date;
  bookmarks: number;
  path: string;
  visibility: boolean;
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

type RowAction = "modify" | "visibility" | "delete";
export interface ConsoleEndpointsProps {
  filter: string;
  searching: boolean;
  setFilter: Function;
  actions?: RowAction;
  data: ConsoleEndpointsData;
  handlePageChange: Function;
  tableRef: RefObject<HTMLTableElement>;
  searchHandler: MouseEventHandler<HTMLButtonElement>;
  refreshEndpoints: MouseEventHandler<HTMLButtonElement>;
  rowActionHandler: (action: RowAction, id: string | null) => () => void;
  // toggleRowAction: (event: MouseEvent, params: RowAction) => () => void;
}

// ConsoleEndpointsProps["rowAction"]

export interface ConsoleEndpointContainerProps {
  theme?: Theme;
  exists: boolean;
  endpoint: GetConsoleEndpointResponse | null;
}

interface FormData {
  method: { value: string; valid: boolean; info: string | null };
  snippet: { value: string; valid: boolean; info: string | null };
  category: { value: string; valid: boolean; info: string | null };

  path: { value: string; valid: boolean; info: string | null; validating?: boolean };
  title: { value: string; valid: boolean; info: string | null; validating?: boolean };
  description: { value: string; valid: boolean; info: string | null; validating?: boolean };

  options: { response: any; composing: boolean; latency: string; snippets: Snippets[]; saving: boolean };
}

export interface ConsoleEndpointProps {
  exists: boolean;
  theme: Theme;
  formData: FormData;
  onInputChange: Function;
  updateSnippet: Function;
  onSelectChange: Function;
  saveEndpoint: MouseEventHandler<HTMLButtonElement>;
  composeEndpoint: MouseEventHandler<HTMLButtonElement>;
  // onValueChange: React.FocusEvent<HTMLInputElement>;
}
