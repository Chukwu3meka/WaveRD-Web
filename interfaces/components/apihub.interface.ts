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
  showTopCategories: boolean;
  displayHeader: boolean;
  categories: Category[];
}

export interface CategoriesIconProps extends SvgIconProps {
  icon: string;
}

export interface CategoriesContainerProps {
  displayHeader: boolean;
  deviceWidth: number;
  categories: Category[];
}
export interface WelcomeProps extends SearchProps {
  showMenu: boolean;
  centered: boolean;
}

export interface SearchProps {
  inputValue: string;
  getEndpoint: Function;
  onValueChange: Function;
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
  breakpoint?: LayoutState["breakpoint"];
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
  title: string;
  latency: number;
  category: string;
  bookmarks: number;
  lastUpdated: string;
  description: string;
  paginationToken: string;
}

// export interface EndpointsIntroProps {
//   showMenu: boolean;
// }

// export interface EndpointsMenuProps {
//   // getEndpointsByCategory: Function;
//   // displayHeader: boolean;
//   endpoints: [];
// }
