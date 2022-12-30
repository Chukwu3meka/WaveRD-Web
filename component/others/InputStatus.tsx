import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { AttentionSeeker } from "react-awesome-reveal";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";

import { IInputStatus } from "@interface/components/others/inputStatus";

const InputStatus = (props: IInputStatus) => {
  const [visible, setVisible] = useState(props.status);

  useEffect(() => {
    setVisible(props.status);
    if (props.status !== "pristine") setTimeout(() => setVisible("pristine"), 4000);
  }, [props.status]);

  return (
    <Box display={visible === "pristine" ? "none" : "inline-block"}>
      <AttentionSeeker effect="rubberBand">
        <IconButton color={visible === "invalid" ? "error" : "success"} aria-label="Status for current field">
          {visible === "invalid" ? <PriorityHighOutlinedIcon /> : <DoneAllOutlinedIcon />}
        </IconButton>
      </AttentionSeeker>
    </Box>
  );
};

export default InputStatus;
