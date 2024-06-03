import { IconProps, SvgIconProps } from "@mui/material";
import { LayoutState } from "interfaces/redux-store/layout.interfaces";
import { GetEndpoints, GetEndpointsResponse } from "interfaces/services/apihub.interface";
import { MouseEventHandler, ReactNode, WheelEventHandler } from "react";

export interface Category {
  id: string;
  // icon: string;
  category: string;
  title: string;
}

export interface CategoriesViewProps {
  selected: string;
  categories: Category[];
  displayHeader: boolean;
  switchCategory: Function;
  showTopCategories: boolean;
}

export interface CategoriesIconProps extends SvgIconProps {
  icon: string;
}

export interface CategoriesContainerProps {
  displayHeader: boolean;
  deviceWidth: number;
  categories: Category[];
  endpoints?: { filter: string; phrase: string };
  setEndpointsParamAction?: Function;
}
export interface WelcomeProps extends SearchProps {
  showMenu: boolean;
  centered: boolean;
}

export interface SearchProps {
  inputValue: string;
  getEndpoint: Function;
  onInputChange: Function;
  searchResult: SearchResult[];
  searchEndpoints: MouseEventHandler<HTMLAnchorElement>;
}
export interface SearchResult {
  id: string;
  title: string;
  description: string;
}

// // !!!!!!!!!!!!
export interface EndpointsContainerProps {
  deviceWidth?: number;
  limit: GetEndpoints["size"];
  endpoints: GetEndpointsResponse;
  setEndpointsParamAction?: Function;
  breakpoint?: LayoutState["breakpoint"];
  endpointsParam?: { filter: string; phrase: string };
}

export interface EndpointsLoadingContainerProps {
  items: number;
  deviceWidth?: number;
  breakpoint?: LayoutState["breakpoint"];
}

export interface EndpointsLoadingProps {
  items: number;
  centered: boolean;
  breakpoint: LayoutState["breakpoint"];
}

export interface EndpointsViewProps {
  centered: boolean;
  hasMoreEndpoints: boolean;
  refreshEndpoints: Function;
  getMoreEndpoints: Function;
  endpoints: GetEndpointsResponse;
  breakpoint: LayoutState["breakpoint"];
}

export interface Endpoint {
  id: string;
  path: string;
  title: string;
  latency: number;
  reference: string;
  bookmarks: number;
  lastUpdated: string;
  description: string;
  paginationToken: string;

  response?: string;
  snippets?: {
    curl: SnippetsFormat;
    fetch: SnippetsFormat;
    [key: string]: SnippetsFormat;
    // fetch: { title: string; snippet: string };
    // curl: { title: string; snippet: string };
  };
}

export interface SnippetsFormat {
  title: string;
  snippet: string;
}

// export interface EndpointsIntroProps {
//   showMenu: boolean;
// }

// export interface EndpointsMenuProps {
//   // getEndpointsByCategory: Function;
//   // displayHeader: boolean;
//   endpoints: [];
// }
