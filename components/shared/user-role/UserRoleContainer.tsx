"use client";

import { UserRole } from ".";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { INIT_PROFILE } from "utils/constants";
import { RootState } from "interfaces/redux-store/store.interface";
import { Role } from "interfaces/redux-store/account.interfaces";
import { UserRoleContainerProps } from "interfaces/components/shared.interface";

const UserRoleContainer = (props: UserRoleContainerProps) => {
  const { enqueueSnackbar } = useSnackbar(),
    [showDialog, setShowDialog] = useState(false),
    [role, setRole] = useState<Role>(INIT_PROFILE.role);

  useEffect(() => {
    setRole(props.role!);
  }, [props.role]);

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
};

const mapStateToProps = (state: RootState) => ({ role: state.account.profile.role }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoleContainer);
