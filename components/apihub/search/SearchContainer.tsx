"use client";

import { Search } from ".";
import { useState } from "react";
import { SearchContainerProps, SearchProps, SearchResult } from "interfaces/components/apihub.interface";
import { searchEndpointService } from "services/apihub.service";
import { AxiosError } from "axios";
import { ApiResponse } from "interfaces/services/shared.interface";

const SearchContainer = ({ getEndpoint }: SearchContainerProps) => {
  const [value, setValue] = useState<SearchProps["value"]>(null),
    [searchResult, setSearchResult] = useState<SearchResult[]>([]),
    [inputValue, setInputValue] = useState<SearchProps["inputValue"]>("");

  const onValueChange = (newValue: any) => {
    // console.log({newValue});

    setValue(newValue);
  };

  const onInputChange = async (newInputValue: string) => {
    console.log({ newInputValue });

    setInputValue(newInputValue);
    if (newInputValue?.length) {
      await searchEndpointService(newInputValue)
        .then(({ success, data }: ApiResponse) => {
          console.log(data);

          // if (success && Array.isArray(data) && data.length) setSearchResult(data);
        })
        .catch(({ response }: AxiosError<ApiResponse>) => {
          setSearchResult([]);
        });
    }
  };

  const isOptionEqualToValue = (option: any, value: any) => {
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
};

export default SearchContainer;
