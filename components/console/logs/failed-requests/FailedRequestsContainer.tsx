"use client";

import validator from "utils/validator";
import ConsoleService from "services/console.service";

import { connect } from "react-redux";
import { FailedRequestsView } from ".";
import { INIT_PROFILE } from "utils/constants";
import { useEffect, useRef, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { RootState } from "interfaces/redux-store/store.interface";
import { Theme } from "interfaces/components/others/layouts.interface";
import { PaginatedResponse } from "interfaces/services/shared.interface";
import { FailedRequestsResponse } from "interfaces/services/console.interface";
import { ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";

interface FailedRequestsContainerProps {
  theme: Theme;
  failedRequests: PaginatedResponse<FailedRequestsResponse>["data"] | null;
}

const FailedRequestsContainer = (props: FailedRequestsContainerProps) => {
  const consoleService = new ConsoleService(),
    { failedRequests } = props,
    [filter, setFilter] = useState(""),
    [searching, setSearching] = useState(false),
    [theme, setTheme] = useState(INIT_PROFILE.theme),
    [viewRow, setViewRow] = useState<null | string>(null),
    tableRef: ConsoleEndpointsProps["tableRef"] = useRef(null);

  const [data, setData] = useState({
    filter: "",
    loading: false,
    page: failedRequests?.page || 0,
    rows: failedRequests?.size || 20,
    content: failedRequests?.content || [],
    total: failedRequests?.totalElements || 0,
  });

  useEffect(() => {
    setTheme(props.theme);
  }, [props.theme]);

  const handlePageChange = async (page: number, rowsPerPage: number = data.rows) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });

    setData((data) => ({ ...data, loading: true, page, rows: rowsPerPage }));

    await consoleService.getFailedRequests({ filter: data.filter, page, size: rowsPerPage }).then(({ success, data, message }) => {
      if (success) {
        if (!data.totalElements) enqueueSnackbar("No Stat added yet", { variant: "success" });
        setData((initData) => ({ ...initData, loading: false, content: data.content, total: data.totalElements }));
      } else {
        setData((data) => ({ ...data, loading: false }));
        enqueueSnackbar(message || "Failed to retrieve data", { variant: "error" });
      }
    });
  };

  const searchHandler = async () => {
    try {
      if (filter) validator({ value: filter, type: "comment", label: "Filter" });

      closeSnackbar();
      setSearching(true);
      setData((data) => ({ ...data, filter }));

      await handlePageChange(0, data.rows);
    } catch ({ message }: any) {
      enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
    } finally {
      setSearching(false);
    }
  };

  const viewHandler = (id: string | null) => () => {
    setViewRow(viewRow === id ? null : id);
  };

  return (
    <main style={{ alignSelf: "start" }}>
      <FailedRequestsView
        data={data}
        theme={theme}
        viewRow={viewRow}
        viewHandler={viewHandler}
        filter={filter}
        tableRef={tableRef}
        searching={searching}
        setFilter={setFilter}
        searchHandler={searchHandler}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

const mapStateToProps = (state: RootState) => ({
    theme: state.account.profile.theme,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FailedRequestsContainer);
