import Link from "next/link";
import Image from "next/image";
import { forwardRef, ReactElement, Ref } from "react";

import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TransitionProps } from "@mui/material/transitions";
import { DialogContentText, DialogActions, DialogContent, SxProps } from "@mui/material";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const dialogStyle: SxProps = (mobileDevice) =>
  mobileDevice
    ? {
        "& .MuiDialog-container": {
          alignItems: "flex-end",
        },
      }
    : {
        width: "clamp(300px, 70vw, 500px)",
        margin: "auto",
      };

const BuilderCookieNotice = ({ displayDialog, allowCookies, mobileDevice }: any) => (
  <Dialog
    open={displayDialog}
    TransitionComponent={Transition}
    keepMounted
    onClose={allowCookies}
    aria-describedby="alert-dialog-slide-description"
    sx={dialogStyle(mobileDevice)}>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        <Image
          src="/images/layout/cookies-notice.png"
          alt="SoccerMASS Cookies Notice"
          height={190}
          width={250}
          placeholder="blur"
          blurDataURL="/images/layout/cookies-notice.png"
          style={{ display: "block", margin: "auto" }}
        />
        <span>
          We use cookies to ensure that we give you the best experience on our website. By continuing to browse this site, you agree to our use of cookies. To
          learn more about cookies and how we use them, please see our Privacy Policy.
        </span>
      </DialogContentText>

      <DialogActions style={{ marginTop: "20px", flexWrap: "wrap", rowGap: 10 }}>
        <Button variant="outlined" sx={{ whiteSpace: "nowrap" }}>
          <Link href="/info/privacy">Learn more</Link>
        </Button>
        <Button variant="contained" sx={{ whiteSpace: "nowrap", color: "white" }} onClick={allowCookies}>
          Yes, I know
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);

export default BuilderCookieNotice;
