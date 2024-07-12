"use client";

import validator from "utils/validator";
import ConsoleService from "services/console.service";

import { ManageWorldView } from ".";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { PaginatedResponse } from "interfaces/services/shared.interface";
import { ManageGameWorldsProps } from "interfaces/components/console/games.interface";
import { ConsoleData, GetGameWorldsResponse } from "interfaces/services/console.interface";

const ManageWorldContainer = ({ worlds }: { worlds: PaginatedResponse<GetGameWorldsResponse>["data"] | null }) => {
  const consoleService = new ConsoleService(),
    router = useRouter(),
    [filter, setFilter] = useState(""),
    [searching, setSearching] = useState(false),
    [reference, setReference] = useState<string | null>(null),
    tableRef: ManageGameWorldsProps["tableRef"] = useRef(null),
    [action, setAction] = useState<ManageGameWorldsProps["actions"] | null>(null);

  const [data, setData] = useState<ConsoleData<GetGameWorldsResponse>>({
    filter: "",
    loading: false,
    page: worlds?.page || 0,
    rows: worlds?.size || 20,
    content: worlds?.content || [],
    total: worlds?.totalElements || 0,
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
      .getGameWorlds({ filter: data.filter, page, size: rowsPerPage })
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

  const rowActionHandler = (action: ManageGameWorldsProps["actions"], id: null | string) => () => {
    if (!id) return;

    if (action === "modify") {
      router.push(`/console/apihub/modify-worlds/${id}`);
    } else {
      setReference(id);
      setAction(action);
    }
  };

  return (
    <main style={{ alignSelf: "start" }}>
      {/* <ManageWorldView
        data={data}
        filter={filter}
        tableRef={tableRef}
        searching={searching}
        setFilter={setFilter}
        searchHandler={searchHandler}
        refreshEndpoints={refreshEndpoints}
        handlePageChange={handlePageChange}
        rowActionHandler={rowActionHandler}
      /> */}

      {/* <ManageWorldDialog data={data} action={action} setData={setData} reference={reference} setReference={setReference} /> */}
    </main>
  );
};

export default ManageWorldContainer;
