import { Endpoint } from ".";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Error from "@component/shared/error";

function EndpointContainer(props) {
  const { endpoint } = props,
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

  return isClient ? <Endpoint currentTab={currentTab} endpoint={endpoint} handleTabChange={handleTabChange} theme={theme} /> : <Error />;
}

const mapStateToProps = (state) => ({
  theme: state.layout.theme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointContainer);
