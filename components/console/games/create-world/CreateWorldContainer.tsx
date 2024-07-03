"use client";

import validator from "utils/validator";
import ConsoleService from "services/console.service";

import { CreateWorld } from ".";
import { FocusEvent, use, useEffect, useRef, useState } from "react";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { PaginatedResponse } from "interfaces/services/shared.interface";
import { DailyStatResponse } from "interfaces/services/console.interface";
import { ConsoleEndpointsProps } from "interfaces/components/console/apihub.interface";
import service, { initAxios } from "services/service";

// const CreateWorldContainer = ({ dailyStats }: CreateWorldContainerProps) => {
const CreateWorldContainer = () => {
  const [formData, setFormData] = useState({ title: "", loading: false, invalid: false });

  const [progress, setProgress] = useState<{ id: number; status: "pending" | "processing" | "success" | "failed"; activity: string }[]>([
    { id: 1, status: "pending", activity: "Validating Requirements to create a new Game world" },
    { id: 2, status: "pending", activity: "Creating Game World ID/Reference" },
    { id: 3, status: "pending", activity: "Generating Game World Statistic" },
    { id: 4, status: "pending", activity: "Generating Game World Calendar" },
    { id: 5, status: "pending", activity: "Generating Game World Tables" },
    { id: 6, status: "pending", activity: "Generating Game World Club" },
    { id: 7, status: "pending", activity: "Compiling Stat, Calendar, Tables and Club" },
    { id: 8, status: "pending", activity: "Populating Database" },
    { id: 9, status: "pending", activity: "Game World has been created succesfully" },
  ]);

  const titleHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, status: boolean) => {
    const title = e.target.value;
    setFormData((formData) => ({ ...formData, title }));
  };

  const consoleService = new ConsoleService();
  // ,
  //   [filter, setFilter] = useState(""),
  //   [searching, setSearching] = useState(false),
  //   tableRef: ConsoleEndpointsProps["tableRef"] = useRef(null);

  // const [data, setData] = useState({
  //   filter: "",
  //   loading: false,
  //   page: dailyStats?.page || 0,
  //   rows: dailyStats?.size || 20,
  //   content: dailyStats?.content || [],
  //   total: dailyStats?.totalElements || 0,
  // });

  // const handlePageChange = async (page: number, rowsPerPage: number = data.rows) => {
  //   tableRef.current?.scrollIntoView({ behavior: "smooth" });

  //   setData((data) => ({ ...data, loading: true, page, rows: rowsPerPage }));

  //   await consoleService.getDailyStat({ filter: data.filter, page, size: rowsPerPage }).then(({ success, data, message }) => {
  //     if (success) {
  //       if (!data.totalElements) enqueueSnackbar("No Stat added yet", { variant: "success" });
  //       setData((initData) => ({ ...initData, loading: false, content: data.content, total: data.totalElements }));
  //     } else {
  //       setData((data) => ({ ...data, loading: false }));
  //       enqueueSnackbar(message || "Failed to retrieve data", { variant: "error" });
  //     }
  //   });
  // };

  // const searchHandler = async () => {
  //   try {
  //     if (filter) validator({ value: filter, type: "comment", label: "Filter" });

  //     closeSnackbar();
  //     setSearching(true);
  //     setData((data) => ({ ...data, filter }));

  //     await handlePageChange(0, data.rows);
  //   } catch ({ message }: any) {
  //     enqueueSnackbar(message || "Could not validate this input", { variant: "error" }); // <=  Inform user of regex error
  //   } finally {
  //     setSearching(false);
  //   }
  // };

  const createWorldHandler = async () => {
    if (formData.loading) return;

    const title = formData.title;

    try {
      validator({ value: title, type: "comment", label: "Title" });

      setFormData((formData) => ({ ...formData, loading: true }));
      setProgress((progress) => progress.map((action) => ({ ...action, status: "pending" })));

      const source = initAxios.CancelToken.source();

      await service({
        method: "post",
        data: { title },
        responseType: "text",
        cancelToken: source.token,
        url: "/console/games/create-game-world",

        onDownloadProgress: (progressEvent) => {
          const data = progressEvent?.event.currentTarget.response;
          const lines = data.split("\n\n");
          lines.forEach((line: any) => {
            if (line.startsWith("data: ")) {
              const serverResponse = line.slice(6);
              if (!serverResponse) return enqueueSnackbar("Internal server error", { variant: "error" });

              const response = JSON.parse(serverResponse);
              if (!response) return enqueueSnackbar("An error occured", { variant: "error" });

              const { data, message, success } = response;
              if (!data) return enqueueSnackbar(message || "An error occured", { variant: "error" });

              const currIndex = progress.findIndex((progress) => progress.id === data);

              if (success) {
                setProgress((progress) =>
                  progress.map((action, i) =>
                    currIndex + 1 === i ? { ...action, status: "processing" } : action.id === data ? { ...action, status: "success" } : action
                  )
                );
              } else {
                if (message) enqueueSnackbar(message || "An error occured", { variant: "error" });
                setProgress((progress) => progress.map((action) => (data < action.id ? { ...action, status: "failed" } : action)));
              }
            }
          });
        },
      });
    } catch (err: any) {
      if (initAxios.isCancel(err)) {
        enqueueSnackbar("Request canceled", { variant: "error" });
      } else {
        enqueueSnackbar(err ? err.message : "An error occured", { variant: "error" });
      }
    } finally {
      setFormData((formData) => ({ ...formData, loading: false }));
    }
  };

  return (
    <CreateWorld
      progress={progress}
      createWorldHandler={createWorldHandler}
      formData={formData}
      titleHandler={titleHandler}
      //
      // data={data}
      // filter={filter}
      // tableRef={tableRef}
      // searching={searching}
      // setFilter={setFilter}
      // searchHandler={searchHandler}
      // handlePageChange={handlePageChange}
    />
  );
};

export default CreateWorldContainer;
