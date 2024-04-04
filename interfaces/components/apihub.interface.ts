import { IconProps, SvgIconProps } from "@mui/material";
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
  loading: boolean;
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
  endpoints?: GetEndpointsResponse;
  initEndpoints: GetEndpointsResponse;
}

export interface EndpointsLoadingContainerProps {
  items: number;
  deviceWidth?: number;
}

export interface EndpointsLoadingProps {
  items: number;
  centered: boolean;
}

export interface EndpointsViewProps {
  hasMoreEndpoints: boolean;
  refreshEndpoints: Function;
  getMoreEndpoints: Function;
  limit: GetEndpoints["size"];
  endpoints: GetEndpointsResponse;
  alignment: "flex-end" | "center";
}

export interface Endpoint {
  id: string;
  title: string;
  latency: number;
  category: string;
  bookmarks: string;
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
