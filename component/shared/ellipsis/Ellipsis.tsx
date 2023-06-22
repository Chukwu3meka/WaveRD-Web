import { Typography } from "@mui/material";

// interface
import { EllipsisProps } from "@interface/components/shared/ellipsis";

export default (props: EllipsisProps) => (
  <Typography
    {...props}
    //
    sx={{ display: "-webkit-box", WebkitLineClamp: props.maxLines, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
    {props.children}
  </Typography>
);
