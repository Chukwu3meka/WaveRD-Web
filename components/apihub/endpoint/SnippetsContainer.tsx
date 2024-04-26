"use client";

import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

import { Snippets } from ".";
import { SnippetsContainerProps } from "interfaces/components/apihub/endpoint.interface";

const SnippetsContainer = ({ snippets, theme }: SnippetsContainerProps) => {
  const { enqueueSnackbar } = useSnackbar(),
    [options, setOptions] = useState([]),
    [codeSnippet, setCodeSnippet] = useState({ snippet: "", format: "" });

  useEffect(() => {
    const options = [];
    for (const [key, value] of Object.entries(snippets)) {
      options.push({ value: key, title: value.title });
    }
    setOptions(options);
  }, []);

  const optionChangeHandler = (event: SelectChangeEvent) => {
    const format = event.target.value as string;

    setCodeSnippet({ format, snippet: snippets[format].snippet });
  };

  const copyToCLipboardHandler = async () => {
    // first time a user runs this function, a confirmation dialog is sent to confirm action
    if (navigator && navigator.clipboard) {
      // copy codeSnippet to clipboard
      await navigator.clipboard.writeText(codeSnippet.snippet);

      // read content of clipboard
      // await navigator.clipboard.readText();

      enqueueSnackbar("Copied!!!", { variant: "success" });
    } else {
      enqueueSnackbar("Failed to copy!!!", { variant: "error" });
    }
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
