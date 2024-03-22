import { MouseEventHandler } from "react";

export interface EndpointsContainerProps {
  deviceWidth: number;
  displayHeader: boolean;
}

export interface EndpointsIntroProps {
  showMenu: boolean;
}

export interface EndpointsMenuProps {
  getEndpointsByCategory: Function;
  displayHeader: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
}

export interface Category {
  _id: string;
  icon: string;
  title: string;
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
