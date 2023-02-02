import { Fade } from "react-awesome-reveal";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { CheckCircle as ValidIcon, Error as InvalidIcon } from "@mui/icons-material";

const InputStatus = ({ visible, status, loading }: any) =>
  loading ? (
    <Fade direction="down" duration={1000} style={{ position: "absolute", top: "-4px", right: "-23px" }}>
      <LoadingButton loading={true} loadingIndicator={<CircularProgress color="inherit" sx={{ color: "rgb(68, 139, 68)" }} size={10} />} />
    </Fade>
  ) : (
    <Fade direction="right" duration={1000} style={{ position: "absolute", top: "-7px", right: "-7px", display: visible ? "inline-block" : "none" }}>
      <IconButton color={status === "valid" ? "success" : "error"} aria-label="Status for current field">
        {status === "valid" ? <ValidIcon fontSize="inherit" sx={{ fontSize: 15 }} /> : <InvalidIcon fontSize="inherit" sx={{ fontSize: 15 }} />}
      </IconButton>
    </Fade>
  );

export default InputStatus;
