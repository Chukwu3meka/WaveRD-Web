"use client";

import validator from "utils/validator";
import ApihubService from "services/apihub.service";

import { Welcome } from ".";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { setEndpointsParamAction } from "redux-store/actions";
import { RootState } from "interfaces/redux-store/store.interface";
import { SearchProps, SearchResult } from "interfaces/components/apihub/endpoints.interface";

const WelcomeContainer = (props: any) => {
  const apihubService = new ApihubService(),
    { enqueueSnackbar } = useSnackbar(),
    [centered, setCentered] = useState(false),
    { getEndpoints, setEndpointsParamAction } = props,
    [searchResult, setSearchResult] = useState<SearchResult[]>([]),
    [showMenu, setShowMenu] = useState((props.deviceWidth || 0) > 900),
    [inputValue, setInputValue] = useState<SearchProps["inputValue"]>("");

  useEffect(() => {
    setShowMenu(props.deviceWidth > 900);
    setCentered(props.deviceWidth < 1200);
  }, [props.deviceWidth]);

  const getEndpoint = (id: string) => {
    console.log("getEndpoint");
  };

  const onInputChange = async (newInputValue: string) => {
    setInputValue(newInputValue);

    if (newInputValue?.length) {
      await apihubService.cancelGetEndpoints();
      await apihubService.updateGetEndpointsSource();

      await apihubService
        .getEndpoints({ filter: "search", size: 3, phrase: newInputValue, sequence: "next", token: "null" })
        .then(({ success, data }) => {
          if (success && data.content && Array.isArray(data.content)) {
            setSearchResult(data.content);
          } else {
            setSearchResult([]);
          }
        })
        .catch(() => setSearchResult([]));
    }
  };

  const searchEndpoints = () => {
    try {
      validator({ value: inputValue, type: "comment", label: "Search Phrase" });
      setEndpointsParamAction({ filter: "search", phrase: inputValue });
    } catch (err: any) {
      if (err && err.message) enqueueSnackbar(err.message || "Something went wrong", { variant: "error" });
    }
  };

  return (
    <Welcome
      showMenu={showMenu}
      centered={centered}
      inputValue={inputValue}
      getEndpoint={getEndpoint}
      searchResult={searchResult}
      onInputChange={onInputChange}
      searchEndpoints={searchEndpoints}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
  }),
  mapDispatchToProps = { setEndpointsParamAction };

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
