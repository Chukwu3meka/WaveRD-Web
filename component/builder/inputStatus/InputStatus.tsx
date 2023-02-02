import { AttentionSeeker } from "react-awesome-reveal";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { DoneAllOutlined as DoneAllOutlinedIcon, PriorityHighOutlined as PriorityHighOutlinedIcon } from "@mui/icons-material";

const InputStatus = ({ visible, status, loading }: any) =>
  loading ? (
    <Box sx={{ width: 50, overflow: "hidden" }}>
      <AttentionSeeker effect="rubberBand">
        <LoadingButton loading={true} loadingIndicator={<CircularProgress color="inherit" sx={{ color: "rgb(141, 202, 141)", ml: -2 }} size={16} />} />
      </AttentionSeeker>
    </Box>
  ) : (
    <Box display={visible ? "inline-block" : "none"} sx={{ width: 50, overflow: "hidden" }}>
      <AttentionSeeker effect="rubberBand">
        <IconButton color={status === "valid" ? "success" : "error"} aria-label="Status for current field">
          {status === "valid" ? <DoneAllOutlinedIcon /> : <PriorityHighOutlinedIcon />}
        </IconButton>
      </AttentionSeeker>
    </Box>
  );

export default InputStatus;
