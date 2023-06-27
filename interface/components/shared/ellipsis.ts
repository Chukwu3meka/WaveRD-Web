import { ReactNode, ComponentType } from "react";
import { TypographyProps } from "@mui/material/Typography";

// export interface EllipsisProps extends ComponentType<TypographyProps> {
export interface EllipsisProps extends TypographyProps {
  children: ReactNode;
  maxlines: number;
}
