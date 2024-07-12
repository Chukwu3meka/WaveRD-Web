import { getUserCookies } from "utils/serverHelpers";

import ConsoleService from "services/console.service";
import ManageWorldContainer from "components/console/games/manage-world";

const ManageWorldPage = async () => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  const worlds = await consoleService
    .getGameWorlds({ filter: "", page: 0, size: 20, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);


  return <ManageWorldContainer worlds={worlds} />;
};

export default ManageWorldPage;
