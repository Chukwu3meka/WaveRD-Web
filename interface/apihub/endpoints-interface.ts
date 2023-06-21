export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: CategoryTypes;
}

type CategoryTypes = "Club" | "Player" | "Country" | "Competition";

export interface SearchProps {
  searchResult: SearchResult[];

  onInputChange: Function;
  onValueChange: Function;
  value: string | null;
  inputValue: string;
}
