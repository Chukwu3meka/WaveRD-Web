import { Typography } from "@mui/material";

import { EllipsisProps } from "@interface/components/shared/ellipsis";

export default (props: EllipsisProps) => (
  <Typography
    {...props}
    style={{ display: "-webkit-box", WebkitLineClamp: props.maxlines, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
    {props.children}
  </Typography>
);
