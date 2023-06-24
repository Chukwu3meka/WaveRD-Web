// dependencies
import { Search } from "..";
import { useState } from "react";

// interfaces
import { SearchProps, SearchResult } from "@interface/apihub/endpoints-interface";
import fetcher from "@utils/fetcher";

function SearchContainer() {
  const [value, setValue] = useState<SearchProps["value"]>(null),
    [searchResult, setSearchResult] = useState<SearchResult[]>([]),
    [inputValue, setInputValue] = useState<SearchProps["inputValue"]>("");

  const onValueChange = (newValue) => {
    setValue(newValue);
    // update value here
  };

  const onInputChange = async (newInputValue) => {
    setInputValue(newInputValue);

    await fetcher({ endpoint: `/apihub/search-endpoints?phrase=${newInputValue}`, method: "GET" })
      .then(({ success, payload }) => {
        if (success && Array.isArray(payload)) setSearchResult(payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <Search searchResult={searchResult} onValueChange={onValueChange} onInputChange={onInputChange} value={value} inputValue={inputValue} />;
}

export default SearchContainer;
