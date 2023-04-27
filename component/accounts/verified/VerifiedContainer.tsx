import ComingSoon from "@component/builder/comingSoon";
import { Verified } from ".";

const VerifiedContainer = () => {
  return process.env.NODE_ENV === "production" ? <ComingSoon header={false} /> : <Verified />;
};

export default VerifiedContainer;
