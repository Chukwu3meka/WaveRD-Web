"use client";

import { ConsoleEndpoints } from ".";
import { useRef, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import ConsoleService from "services/console.service";
import { ConsoleEndpointsProps, EndpointsContainerProps, ConsoleEndpointsData } from "interfaces/components/console/apihub.interface";
import validator from "utils/validator";

const ConsoleEndpointsContainer = ({ endpoints }: EndpointsContainerProps) => {
  const consoleService = new ConsoleService(),
    [filter, setFilter] = useState(""),
    [searching, setSearching] = useState(false),
    tableRef: ConsoleEndpointsProps["tableRef"] = useRef(null);

  const [viewRequest, setViewRequest] = useState<null | any>(null),
    [fetchingRequest, setFetchingRequest] = useState(true);

  const [data, setData] = useState<ConsoleEndpointsData>({
    filter: "",
    loading: false,
    page: endpoints?.page || 0,
    rows: endpoints?.size || 20,
    content: endpoints?.content || [],
    total: endpoints?.totalElements || 0,
  });

  const handlePageChange = async (page: number, rowsPerPage: number = data.rows) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });

    setData((data) => ({ ...data, loading: true, page, rows: rowsPerPage }));

    await consoleService
      .getEndpoints({ filter: data.filter, page, size: rowsPerPage })
      .then(({ success, data }) => {
        if (success) setData((initData) => ({ ...initData, loading: false, content: data.content, total: data.totalElements }));
        return null;
      })
      .catch(() => {
        setData((data) => ({ ...data, loading: false }));
        enqueueSnackbar("Failed to retrieve data", { variant: "error" });
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

  const toggleViewRequest = async (event: React.KeyboardEvent | React.MouseEvent, id: null | any = null) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;

    setViewRequest(id);

    if (id) {
      setFetchingRequest(true);

      // await fetcher({ endpoint: `/gaAppraisalRequest/${id}`, method: "get" })
      //   .then((res) => setViewRequest(res.data))
      //   .catch(() => enqueueSnackbar("Failed to retrieve data", { variant: "error" }))
      //   .finally(() => setFetchingRequest(false));
    }
  };

  return (
    <ConsoleEndpoints
      data={data}
      searching={searching}
      filter={filter}
      setFilter={setFilter}
      searchHandler={searchHandler}
      tableRef={tableRef}
      handlePageChange={handlePageChange}
      toggleViewRequest={toggleViewRequest}
    />
  );
};

export default ConsoleEndpointsContainer;
