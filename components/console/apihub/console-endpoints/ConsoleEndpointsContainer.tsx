"use client";

import validator from "utils/validator";
import ConsoleService from "services/console.service";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { ConsoleEndpoints, ConsoleEndpointsDialog } from ".";
import { PaginatedResponse } from "interfaces/services/shared.interface";
import { ConsoleEndpointsProps, ConsoleEndpointsData, ConsoleEndpointsContent } from "interfaces/components/console/apihub.interface";

interface ConsoleEndpointsContainerProps {
  // endpoints: PaginatedResponse<Endpoint>["data"] | null;
  endpoints: PaginatedResponse<ConsoleEndpointsContent>["data"] | null;
}

const ConsoleEndpointsContainer = ({ endpoints }: ConsoleEndpointsContainerProps) => {
  const consoleService = new ConsoleService(),
    router = useRouter(),
    [filter, setFilter] = useState(""),
    [searching, setSearching] = useState(false),
    [reference, setReference] = useState<string | null>(null),
    tableRef: ConsoleEndpointsProps["tableRef"] = useRef(null),
    [action, setAction] = useState<ConsoleEndpointsProps["actions"] | null>(null);

  const [data, setData] = useState<ConsoleEndpointsData>({
    filter: "",
    loading: false,
    page: endpoints?.page || 0,
    rows: endpoints?.size || 20,
    content: endpoints?.content || [],
    total: endpoints?.totalElements || 0,
  });

  const refreshEndpoints = () => {
    try {
      window?.location.reload();
    } catch (error) {
      router.refresh();
    }
  };

  const handlePageChange = async (page: number, rowsPerPage: number = data.rows) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });

    setData((data) => ({ ...data, loading: true, page, rows: rowsPerPage }));

    await consoleService
      .getEndpoints({ filter: data.filter, page, size: rowsPerPage })
      .then(({ success, data }) => {
        if (!success) throw { message: "An error occurred" };
        if (!data.totalElements) enqueueSnackbar("No Endpoint added yet", { variant: "success" });

        setData((initData) => ({ ...initData, loading: false, content: data.content, total: data.totalElements }));
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

  const rowActionHandler = (action: ConsoleEndpointsProps["actions"], id: null | string) => () => {
    if (!id) return;

    if (action === "modify") {
      router.push(`/console/apihub/modify-endpoints/${id}`);
    } else {
      setReference(id);
      setAction(action);
    }
  };

  return (
    <main style={{ alignSelf: "start" }}>
      <ConsoleEndpoints
        data={data}
        filter={filter}
        tableRef={tableRef}
        searching={searching}
        setFilter={setFilter}
        searchHandler={searchHandler}
        refreshEndpoints={refreshEndpoints}
        handlePageChange={handlePageChange}
        rowActionHandler={rowActionHandler}
      />

      <ConsoleEndpointsDialog data={data} action={action} setData={setData} reference={reference} setReference={setReference} />
    </main>
  );
};

export default ConsoleEndpointsContainer;
