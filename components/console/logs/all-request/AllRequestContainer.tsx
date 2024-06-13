"use client";

import validator from "utils/validator";
import ConsoleService from "services/console.service";

import { AllRequestView } from ".";
import { useRef, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { PaginatedResponse } from "interfaces/services/shared.interface";
import { AllRequestsResponse } from "interfaces/services/console.interface";
import { ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";

interface AllRequestViewProps {
  allRequests: PaginatedResponse<AllRequestsResponse>["data"] | null;
}

const AllRequestContainer = ({ allRequests }: AllRequestViewProps) => {
  const consoleService = new ConsoleService(),
    [filter, setFilter] = useState(""),
    [searching, setSearching] = useState(false),
    tableRef: ConsoleEndpointsProps["tableRef"] = useRef(null);

  const [data, setData] = useState({
    filter: "",
    loading: false,
    page: allRequests?.page || 0,
    rows: allRequests?.size || 20,
    content: allRequests?.content || [],
    total: allRequests?.totalElements || 0,
  });

  const handlePageChange = async (page: number, rowsPerPage: number = data.rows) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });

    setData((data) => ({ ...data, loading: true, page, rows: rowsPerPage }));

    await consoleService.getAllRequests({ filter: data.filter, page, size: rowsPerPage }).then(({ success, data, message }) => {
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

  return (
    <main style={{ alignSelf: "start" }}>
      <AllRequestView
        data={data}
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

export default AllRequestContainer;
