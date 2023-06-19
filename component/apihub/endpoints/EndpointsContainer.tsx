import { connector, ConnectorProps } from "@store";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Endpoints, styles, NavigationContainer, EndpointContainer } from ".";
import { connect } from "react-redux";

function EndpointsContainer(props) {
  const [showEndpoints, setShowEndpoints] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setShowEndpoints(props.width > 620);
  }, [props.width]);

  return <Endpoints showEndpoints={showEndpoints} />;
}

const mapStateToProps = (state) => ({
  width: state.layout.width,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
