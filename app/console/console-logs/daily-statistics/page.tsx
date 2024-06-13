import ConsoleService from "services/console.service";

import { getUserCookies } from "utils/serverHelpers";
import { DailyStatisticsContainer } from "components/console/logs/daily-statistics";

const Page = async () => {
  const cookie = await getUserCookies(),
    consoleService = new ConsoleService();

  const dailyStats = await consoleService
    .getDailyStat({ filter: "", page: 0, size: 20, cookie })
    .then(({ success, data }) => {
      if (success) return data;
      return null;
    })
    .catch(() => null);

  return <DailyStatisticsContainer dailyStats={dailyStats} />;
};

export default Page;
