import { UserRole } from ".";
import { useSnackbar } from "notistack";
import { useStoreContext } from "components/providers/StoreProvider";

export default function UserRoleContainer() {
  const { enqueueSnackbar } = useSnackbar(),
    { role } = useStoreContext().user.profile;

  const clickHandler = () => {
    switch (role) {
      case "test":
        enqueueSnackbar(
          `Kindly be informed that this is a test account and certain actions are restricted while others have no permanent result. 
You can create a standard user account via signup to enjoy premium contents.
Sign in if you already have an account with SoccerMASS to persist changes you make.
`,
          { variant: "error" }
        );
        break;

      default:
        break;
    }
  };

  return <UserRole role={role} clickHandler={clickHandler} />;
}
