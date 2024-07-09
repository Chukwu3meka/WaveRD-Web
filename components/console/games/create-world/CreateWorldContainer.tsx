"use client";

import validator from "utils/validator";
import service, { initAxios } from "services/service";

import { CreateWorld } from ".";
import { enqueueSnackbar } from "notistack";
import { FocusEvent, useState } from "react";

type Status = "pending" | "success" | "failed";

const CreateWorldContainer = () => {
  const [progress, setProgress] = useState<{ status: Status; activity: string }[]>([]);
  const [formData, setFormData] = useState({ title: "111", loading: false, invalid: false });

  const titleHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, status: boolean) => {
    const title = e.target.value;
    setFormData((formData) => ({ ...formData, title }));
  };

  const createWorldHandler = async () => {
    if (formData.loading) return;

    const title = formData.title;

    try {
      setProgress(() => []);

      validator({ value: title, type: "comment", label: "Title" });

      setFormData((formData) => ({ ...formData, loading: true }));
      setProgress((progress) => progress.map((action) => ({ ...action, status: "pending" })));

      const source = initAxios.CancelToken.source();

      await service({
        method: "post",
        data: { title },
        responseType: "text",
        cancelToken: source.token,
        url: "/console/games/game-worlds",

        onDownloadProgress: (progressEvent) => {
          const lines = progressEvent?.event.currentTarget.response.split("\n\n");

          lines.forEach((line: any) => {
            if (line.startsWith("data: ")) {
              const serverResponse = line.slice(6);
              if (!serverResponse) return enqueueSnackbar("Internal server error", { variant: "error" });

              const response = JSON.parse(serverResponse);
              if (!response) return enqueueSnackbar("An error occured", { variant: "error" });

              const { data, message, success } = response;
              if (!data) return enqueueSnackbar(message || "An error occured", { variant: "error" });

              setProgress((progress) => [{ status: data, activity: message }, ...progress.filter(({ activity }) => activity !== message)]);

              if (!success && message) {
                enqueueSnackbar(message || "An error occured", { variant: "error" });
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

  return <CreateWorld progress={progress} formData={formData} titleHandler={titleHandler} createWorldHandler={createWorldHandler} />;
};

export default CreateWorldContainer;
