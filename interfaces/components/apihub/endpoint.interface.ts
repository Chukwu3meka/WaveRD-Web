import { ChangeEventHandler, MouseEventHandler } from "react";
import { Theme } from "../others/layouts.interface";
import { Endpoint, SnippetsFormat } from "./endpoints.interface";
import { SelectChangeEvent } from "@mui/material";
import { LayoutState } from "interfaces/redux-store/layout.interfaces";

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
  theme: Theme;
  title: string;
  description: string;
}

export interface EndpointViewProps extends EndpointContainerProps {
  handleTabChange: Function;
  currentTab: "1" | "2" | "3";
}

export interface EndpointResponseProps {
  response: string;
  path: string;
  theme: Theme;
}

export interface SnippetsProps {
  copyToCLipboardHandler: MouseEventHandler<HTMLButtonElement>;
  snippet: { format: string; code: string };
  optionChangeHandler: Function;
  theme: Theme;
  options: SnippetsFormat[];
}
