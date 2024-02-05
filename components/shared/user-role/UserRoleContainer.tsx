import { UserRole } from ".";
import { useSnackbar } from "notistack";
import { useStoreContext } from "components/providers/StoreProvider";

const UserRoleContainer = () => {
  const { enqueueSnackbar } = useSnackbar(),
    { role } = useStoreContext().user.profile;

  const clickHandler = () => {
    switch (role) {
      case "test":
        enqueueSnackbar("Kindly be informed that this is a test account and certain actions are restricted while others have no permanent result", { variant: "error" });
        break;

      default:
        break;
    }
  };

  return <UserRole role={role} clickHandler={clickHandler} />;
};

export default UserRoleContainer;
