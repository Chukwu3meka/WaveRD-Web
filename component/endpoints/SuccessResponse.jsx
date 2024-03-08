import Highlight from "react-highlight";
import Button from "@mui/material/Button";

const SuccessResponse = ({ endpoint: { successResponse }, activeTab, handleTabChange }) => (
  <div hidden={activeTab !== 2}>
    <Highlight>{JSON.stringify(successResponse, null, 2)}</Highlight>

    <Button color="secondary" variant="outlined" onClick={() => handleTabChange(0)}>
      API Description
    </Button>
  </div>
);

export default SuccessResponse;
