import { ChangeEventHandler, MouseEventHandler } from "react";
import { Theme } from "../layouts.interface";
import { Endpoint, SnippetsFormat } from "./endpoints.interface";
import { SelectChangeEvent } from "@mui/material";

export interface SnippetsContainerProps {
  snippets: Endpoint["snippets"];
  theme: Theme;
}

export interface EndpointContainerProps {
  endpoint: Endpoint;
  theme: Theme;
}

export interface EndpointSSRProps {
  path: string;
}

export interface DescriptionProps {
  title: string;
  description: string;
}

export interface EndpointViewProps extends EndpointContainerProps {
  currentTab: "1" | "2" | "3";
  handleTabChange: Function;
}

export interface EndpointResponseProps {
  response: string;
  theme: Theme;
}

export interface SnippetsProps {
  copyToCLipboardHandler: MouseEventHandler<HTMLButtonElement>;
  codeSnippet: { format: string; snippet: string };
  optionChangeHandler: Function;
  theme: Theme;
  options: SnippetsFormat[];
}
