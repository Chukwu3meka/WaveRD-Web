"use client";

import { UserRole } from ".";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useStoreContext } from "components/providers/StoreProvider";

export default function UserRoleContainer() {
  const { enqueueSnackbar } = useSnackbar(),
    { role } = useStoreContext().user.profile,
    [showDialog, setShowDialog] = useState(false);

  const toggleHandler = () => {
    switch (role) {
      case "test":
        setShowDialog(!showDialog);
        break;
      // case "test":
      //   enqueueSnackbar(``, { variant: "error" });
      //   break;
      default:
        break;
    }
  };

  return <UserRole role={role} toggleHandler={toggleHandler} showDialog={showDialog} />;
}
