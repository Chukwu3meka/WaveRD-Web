"use client";

import apihubService from "services/apihub.service";

import { Search } from ".";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { ApiResponse } from "interfaces/services/shared.interface";
import { SearchProps, SearchResult } from "interfaces/components/apihub.interface";
import validator from "utils/validator";

const SearchContainer = () => {
  const { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [searchPhrase, setSearchPhrase] = useState<string>(""),
    [searchResult, setSearchResult] = useState<SearchResult[]>([]),
    [inputValue, setInputValue] = useState<SearchProps["inputValue"]>("");

  const onValueChange = (newSearchPhrase: string) => {
    setSearchPhrase(newSearchPhrase);
  };

  const getEndpoint = (id: string) => {
    console.log("getEndpoint");
  };

  const onInputChange = async (newInputValue: string) => {
    setInputValue(newInputValue);

    // if (newInputValue?.length) {
    //   await apihubService
    //     .getEndpoints(newInputValue)
    //     .then(({ success, data }: ApiResponse) => {
    //       if (success && Array.isArray(data) && [...data].length) setSearchResult(data);
    //     })
    //     .catch(() => setSearchResult([]));
    // }
  };

  const searchEndpoints = async () => {
    try {
      console.log({ inputValue });

      if (!inputValue) throw { message: "Search Phrase cannot be empty" };

      validator({ value: inputValue, type: "comment", label: "Search Phrase" });

      setLoading(true);
    } catch (err: any) {
      if (err && err.message) enqueueSnackbar(err.message || "Something went wrong", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Search
      loading={loading}
      inputValue={inputValue}
      getEndpoint={getEndpoint}
      searchResult={searchResult}
      onValueChange={onValueChange}
      onInputChange={onInputChange}
      searchEndpoints={searchEndpoints}
    />
  );
};

export default SearchContainer;
