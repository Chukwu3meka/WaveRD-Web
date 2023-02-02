import { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker } from "react-awesome-reveal";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";

// import { IInputStatus } from "@interface/components/others/inputStatus";

// const InputStatus = (props: IInputStatus) => {
const InputStatus = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("invalid");

  useEffect(() => {
    // ? Ensure user has started typing before displaying input status
    if (!props.pristine) {
      setVisible(true);
      setStatus(props.status);
    }
  }, [props.value, props.value]); // <= value is required from parent component to always cause a re-render

  useEffect(() => {
    // remove input status after 4 seconds
    const interval = setInterval(() => setTimeout(() => setVisible(false)), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box display={visible ? "inline-block" : "none"}>
      <AttentionSeeker effect="rubberBand">
        {status === "loading" ? (
          <LoadingButton loading={true} variant="text" loadingIndicator={<CircularProgress color="inherit" sx={{ color: "rgb(141, 202, 141)" }} size={16} />} />
        ) : (
          <IconButton color={status === "valid" ? "success" : "error"} aria-label="Status for current field">
            {status === "valid" ? <DoneAllOutlinedIcon /> : <PriorityHighOutlinedIcon />}
          </IconButton>
        )}
      </AttentionSeeker>
    </Box>
  );
};

export default InputStatus;
