import Link from "next/link";
import Image from "next/image";
import { forwardRef, ReactElement, Ref } from "react";

import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { TransitionProps } from "@mui/material/transitions";
import DialogContentText from "@mui/material/DialogContentText";

import { styles } from ".";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BuilderCookieNotice = ({ displayDialog, closeDialogFn }: any) => (
  <Dialog open={displayDialog} TransitionComponent={Transition} keepMounted onClose={closeDialogFn} aria-describedby="alert-dialog-slide-description">
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description" className={styles.cookieNotice}>
        <Image
          src="/images/layout/cookies-notice.png"
          alt="SoccerMASS Cookies Notice"
          height={190}
          width={270}
          placeholder="blur"
          blurDataURL="/images/layout/cookies-notice.png"
        />
        <span>
          We use cookies to ensure that we give you the best experience on our website. By continuing to browse this site, you agree to our use of cookies. To
          learn more about cookies and how we use them, please see our Privacy Policy.
        </span>
        <Button>
          <Link href="/info/privacy">Learn more</Link>
        </Button>
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

export default BuilderCookieNotice;
