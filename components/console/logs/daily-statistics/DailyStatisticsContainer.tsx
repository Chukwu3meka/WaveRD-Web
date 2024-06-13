"use client";

import validator from "utils/validator";
import ConsoleService from "services/console.service";

import { DailyStatistics } from ".";
import { useRef, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { DailyStatResponse } from "interfaces/services/console.interface";
import { PaginatedResponse } from "interfaces/services/shared.interface";
import { ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";

interface DailyStatisticsContainerProps {
  dailyStats: PaginatedResponse<DailyStatResponse>["data"] | null;
}

const DailyStatisticsContainer = ({ dailyStats }: DailyStatisticsContainerProps) => {
  const consoleService = new ConsoleService(),
    [filter, setFilter] = useState(""),
    [searching, setSearching] = useState(false),
    tableRef: ConsoleEndpointsProps["tableRef"] = useRef(null);

  const [data, setData] = useState({
    filter: "",
    loading: false,
    page: dailyStats?.page || 0,
    rows: dailyStats?.size || 20,
    content: dailyStats?.content || [],
    total: dailyStats?.totalElements || 0,
  });

  const handlePageChange = async (page: number, rowsPerPage: number = data.rows) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });

    setData((data) => ({ ...data, loading: true, page, rows: rowsPerPage }));

    await consoleService.getDailyStat({ filter: data.filter, page, size: rowsPerPage }).then(({ success, data, message }) => {
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
      <DailyStatistics
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

export default DailyStatisticsContainer;
