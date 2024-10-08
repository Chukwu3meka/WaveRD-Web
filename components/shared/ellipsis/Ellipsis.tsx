import { Typography } from "@mui/material";
import { EllipsisProps } from "interfaces/components/others/shared.interface";

const Ellipsis = (props: EllipsisProps) => (
  <Typography
    {...props}
    style={{
      overflow: "hidden",
      display: "-webkit-box",
      wordBreak: "break-all",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: props.lines,
    }}>
    {props.children}
  </Typography>
);

export default Ellipsis;
