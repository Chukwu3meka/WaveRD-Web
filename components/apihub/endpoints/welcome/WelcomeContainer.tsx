"use client";

import apihubService from "services/apihub.service";

import { Welcome } from ".";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { ApiResponse } from "interfaces/services/shared.interface";
import { SearchProps, SearchResult } from "interfaces/components/apihub.interface";
import validator from "utils/validator";
import { connect } from "react-redux";
import { RootState } from "interfaces/redux-store/store.interface";

const WelcomeContainer = (props: any) => {
  const { getEndpoints, setSearchParam } = props,
    { enqueueSnackbar } = useSnackbar(),
    [centered, setCentered] = useState(false),
    [loading, setLoading] = useState(false),
    [searchPhrase, setSearchPhrase] = useState<string>(""),
    [searchResult, setSearchResult] = useState<SearchResult[]>([]),
    [showMenu, setShowMenu] = useState((props.deviceWidth || 0) > 900),
    [inputValue, setInputValue] = useState<SearchProps["inputValue"]>("");

  useEffect(() => {
    setShowMenu(props.deviceWidth > 900);
    //  setCentered(props.deviceWidth < 1200);
    setCentered(props.deviceWidth < 1200);
  }, [props.deviceWidth]);

  const onValueChange = (newSearchPhrase: string) => {
    setSearchPhrase(newSearchPhrase);
  };

  const getEndpoint = (id: string) => {
    console.log("getEndpoint");
  };

  const onInputChange = async (newInputValue: string) => {
    setInputValue(newInputValue);

    if (newInputValue?.length) {
      console.log(newInputValue);
      // const a = await getEndpoints({ phrase: newInputValue, sequence: "next", token: "initial", limit: 3 });
      // console.log(a);

      //   await apihubService
      //     .getEndpoints(newInputValue)
      //     .then(({ success, data }: ApiResponse) => {
      //       if (success && Array.isArray(data) && [...data].length) setSearchResult(data);
      //     })
      //     .catch(() => setSearchResult([]));
    }
  };

  const searchEndpoints = async () => {
    try {
      // console.log({ inputValue });

      if (!inputValue) throw { message: "Search Phrase cannot be empty" };

      validator({ value: inputValue, type: "comment", label: "Search Phrase" });

      setSearchParam({ phrase: inputValue, initial: true });

      setLoading(true);
    } catch (err: any) {
      if (err && err.message) enqueueSnackbar(err.message || "Something went wrong", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Welcome
      loading={loading}
      showMenu={showMenu}
      centered={centered}
      inputValue={inputValue}
      getEndpoint={getEndpoint}
      searchResult={searchResult}
      onValueChange={onValueChange}
      onInputChange={onInputChange}
      searchEndpoints={searchEndpoints}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
