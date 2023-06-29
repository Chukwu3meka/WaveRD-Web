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
