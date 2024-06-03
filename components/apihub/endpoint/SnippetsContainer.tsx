"use client";

import { Snippets } from ".";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { ObjectEntries, copyToCLipboard } from "utils/helpers";
import { SnippetsFormat } from "interfaces/components/apihub/endpoints.interface";
import { SnippetsContainerProps } from "interfaces/components/apihub/endpoint.interface";

const SnippetsContainer = ({ snippets, theme }: SnippetsContainerProps) => {
  const { enqueueSnackbar } = useSnackbar(),
    [options, setOptions] = useState<SnippetsFormat[]>([]),
    [codeSnippet, setCodeSnippet] = useState({ snippet: "", format: "" });

  useEffect(() => {
    const options: SnippetsFormat[] = [];

    for (const [key, value] of ObjectEntries<any>(snippets)) {
      options.push({ snippet: key as string, title: value.title });
    }

    setOptions(options);
  }, []);

  const optionChangeHandler = (event: SelectChangeEvent) => {
    const format = event.target.value as string;

    if (snippets) {
      setCodeSnippet({ format, snippet: snippets[format].snippet });
    }
  };

  const copyToCLipboardHandler = async () => {
    copyToCLipboard(codeSnippet.snippet)
      .then(() => enqueueSnackbar("Copied!!!", { variant: "success" }))
      .catch(() => enqueueSnackbar("Failed to copy!!!", { variant: "error" }));
  };

  return (
    <Snippets
      theme={theme}
      options={options}
      codeSnippet={codeSnippet}
      optionChangeHandler={optionChangeHandler}
      copyToCLipboardHandler={copyToCLipboardHandler}
    />
  );
};
export default SnippetsContainer;
