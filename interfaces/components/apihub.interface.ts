import { Theme } from "./layouts.interface";
import { ReactChildren } from "./shared.interface";
import { Profile } from "interfaces/redux-store/account.interfaces";

export interface EndpointsContainerProps {
  deviceWidth: number;
}

export interface EndpointsIntroProps {
  showMenu: boolean;
  getEndpoint: Function;
}

export interface SearchContainerProps {
  getEndpoint: Function;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  // category: CategoryTypes;
}

// type CategoryTypes = "Club" | "Player" | "Country" | "Competition";

export interface SearchProps {
  // searchResult: SearchResult[] | SearchProps["value"];
  searchResult: SearchResult[];
  getEndpoint: Function;
  onInputChange: Function;
  onValueChange: Function;
  // value: string | null;
  value: SearchResult | null;
  // value: string;
  inputValue: string;
  isOptionEqualToValue: Function;
}
