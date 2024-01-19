import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide, { SlideProps } from "@mui/material/Slide";
import Grow, { GrowProps } from "@mui/material/Grow";
import { TransitionProps } from "@mui/material/transitions";
import { ReactChildren } from "interfaces/components/shared.interface";
import { useStoreContext } from "./StoreContext";
import { ComponentType, useEffect, useState } from "react";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function SnackbarProvider() {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const { message, setMessage } = useStoreContext().snackbar;

  useEffect(() => {
    setShowSnackbar(!!message);
  }, [message]);

  // const handleClick =
  //   (
  //     Transition: ComponentType<
  //       TransitionProps & {
  //         children: React.ReactElement<any, any>;
  //       }
  //     >
  //   ) =>
  //   () => {
  //     setState({
  //       open: true,
  //       Transition,
  //     });
  //   };

  const handleClose = () => {
    // setState({
    //   ...state,
    //   open: false,
    // });
    setShowSnackbar(false);
  };

  // <SnackbarProvider maxSnack={2} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>

  return <Snackbar open={showSnackbar} onClose={handleClose} message={message} key="slide" autoHideDuration={1200} TransitionComponent={SlideTransition} />;
}
