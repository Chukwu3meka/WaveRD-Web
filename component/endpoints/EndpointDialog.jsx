import { Endpoint } from ".";
import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EndpointDialog = ({
  displayDialog,
  hideEndpointDialogHandler,
  loading,
  activeTab,
  handleTabChange,
  endpoint,
  copyToCLipboardHandler,
  ratingHover,
  setRatingHover,
}) => (
  <Dialog fullScreen open={displayDialog} onClose={hideEndpointDialogHandler} TransitionComponent={Transition}>
    <AppBar color="secondary" sx={{ position: "relative" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={hideEndpointDialogHandler} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          {endpoint?.title || "API Overview"}
        </Typography>
      </Toolbar>
    </AppBar>
    <Endpoint
      ratingHover={ratingHover}
      setRatingHover={setRatingHover}
      loading={loading}
      endpoint={endpoint}
      activeTab={activeTab}
      handleTabChange={handleTabChange}
      copyToCLipboardHandler={copyToCLipboardHandler}
    />
  </Dialog>
);

export default EndpointDialog;
