import { Search } from "..";

import { useState } from "react";
import fetcher from "@utils/fetcher";

import { SearchProps, SearchResult } from "@interface/apihub/endpoints-interface";

function SearchContainer({ getEndpoint }) {
  const [value, setValue] = useState<SearchProps["value"]>(null),
    [searchResult, setSearchResult] = useState<SearchResult[]>([]),
    [inputValue, setInputValue] = useState<SearchProps["inputValue"]>("");

  const onValueChange = (newValue) => {
    setValue(newValue);
  };

  const onInputChange = async (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue?.length)
      await fetcher({ endpoint: `/apihub/endpoints/search?query=${newInputValue}`, method: "GET" })
        .then(({ success, data }) => {
          if (success && Array.isArray(data) && data.length) setSearchResult(data);
        })
        .catch((err) => setSearchResult([]));
  };

  const isOptionEqualToValue = (option, value) => {
    // Custom equality test logic
    // Return true if the option is equal to the value, false otherwise
    // For example, if both option and value are objects, you can compare their properties
    return option.id === value.id;
  };

  return (
    <Search
      value={value}
      inputValue={inputValue}
      getEndpoint={getEndpoint}
      searchResult={searchResult}
      onValueChange={onValueChange}
      onInputChange={onInputChange}
      isOptionEqualToValue={isOptionEqualToValue}
    />
  );
}

export default SearchContainer;
