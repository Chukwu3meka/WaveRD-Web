import { IconProps, SvgIconProps } from "@mui/material";
import { LayoutState } from "interfaces/redux-store/layout.interfaces";
import { GetEndpoints, GetEndpointsResponse } from "interfaces/services/apihub.interface";
import { MouseEventHandler, ReactNode, WheelEventHandler } from "react";

interface Snippets {
  curl: Format;
  fetch: Format;
  [key: string]: any;
}

type Format = {
  title: string;
  snippet: string;
};

export interface SnippetsContainerProps {
  snippets: Snippets;
  theme: string;
}
