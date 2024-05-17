"use client";

import validator from "utils/validator";
import ConsoleService from "services/console.service";

import { ConsoleEndpoints } from ".";
import { useRef, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { ConsoleEndpointsProps, ConsoleEndpointsContainerProps, ConsoleEndpointsData } from "interfaces/components/console/apihub.interface";

const ConsoleEndpointsContainer = ({ endpoints }: ConsoleEndpointsContainerProps) => {
  const consoleService = new ConsoleService(),
    [filter, setFilter] = useState(""),
    [searching, setSearching] = useState(false),
    tableRef: ConsoleEndpointsProps["tableRef"] = useRef(null);

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

  const toggleShowEndpoint = async (event: React.KeyboardEvent | React.MouseEvent, id: null | any = null) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;

    // setShowEndpoint(id);
  };

  return (
    <ConsoleEndpoints
      data={data}
      filter={filter}
      tableRef={tableRef}
      searching={searching}
      setFilter={setFilter}
      searchHandler={searchHandler}
      handlePageChange={handlePageChange}
      toggleShowEndpoint={toggleShowEndpoint}
    />
  );
};

export default ConsoleEndpointsContainer;
