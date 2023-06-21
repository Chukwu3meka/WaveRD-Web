import { ReactNode } from "react";
import { Typography } from "@mui/material";

type TypographyProp = typeof Typography;

export interface EllipsisProps extends TypographyProp {
  clamp: number;
  children: ReactNode;
}
