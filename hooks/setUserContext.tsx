import { useStoreContext } from "components/providers/StoreContext";
import { Details } from "interfaces/store/user.interfaces";

interface SetUserContext {
  details: Details | null;
}

export default function useSetUserContext({ details }: SetUserContext): null {
  const { setAuthenticated, setDetails } = useStoreContext().user;

  if (details) {
    setDetails(details);
    setAuthenticated(true);
  } else {
    setDetails(null);
    setAuthenticated(false);
  }

  return null;
}
