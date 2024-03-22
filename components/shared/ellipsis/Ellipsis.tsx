import { Typography } from "@mui/material";
import { EllipsisProps } from "interfaces/components/shared.interface";

const Ellipsis = (props: EllipsisProps) => (
  <Typography
    {...props}
    style={{
      overflow: "hidden",
      display: "-webkit-box",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: props.lines,
    }}>
    {props.children}
  </Typography>
);

export default Ellipsis;
