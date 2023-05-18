import Deletion from "@component/info/deletion";
import ComingSoon from "@component/shared/comingSoon";

export default () => (process.env.NODE_ENV === "production" ? <ComingSoon /> : <Deletion />);
