import { Endpoint } from ".";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Error from "@component/shared/error";

function EndpointContainer(props) {
  const { endpoint } = props,
    { enqueueSnackbar } = useSnackbar(),
    [theme, setTheme] = useState("light"),
    [isClient, setIsClient] = useState(false),
    [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setTheme(props.theme);
  }, [props.theme]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (typeof newValue === "number") setCurrentTab(newValue);
  };

  const copyToCLipboardHandler = async () => {
    // first time a user runs this function, a confirmation dialog is sent to confirm action
    if (navigator && navigator.clipboard) {
      // copy codeSnippet to clipboard
      await navigator.clipboard.writeText(endpoint.snippet);

      // read content of clipboard
      // await navigator.clipboard.readText();

      enqueueSnackbar("Copied!!!", { variant: "success" });
    } else {
      enqueueSnackbar("Failed to copy!!!", { variant: "error" });
    }
  };

  return isClient ? (
    <Endpoint currentTab={currentTab} endpoint={endpoint} handleTabChange={handleTabChange} copyToCLipboardHandler={copyToCLipboardHandler} theme={theme} />
  ) : (
    <Error />
  );
}

const mapStateToProps = (state) => ({
  theme: state.layout.theme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointContainer);
