import { Error } from ".";
import { Terrain as TerrainIcon } from "@mui/icons-material";

function ErrorContainer(props) {
  const {
    description = "The cause of the error cannot be determined, If the error persist kindly contact our support center",
    title = "Something went wronG",
    ErrorIcon = TerrainIcon,
    errorHandler,
    ...others
  } = props;

  return <Error description={description} ErrorIcon={ErrorIcon} errorHandler={errorHandler} title={title} others={others} />;
}

export default ErrorContainer;
