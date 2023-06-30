import { connector, ConnectorProps } from "@store";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Endpoints } from ".";
import { connect } from "react-redux";
import fetcher from "@utils/fetcher";

function EndpointsContainer(props) {
  const [endpoint, setEndpoint] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: false });
  // const [showEndpoints, setShowEndpoints] = useState(false);

  // useEffect(() => {
  //   setShowEndpoints(props.width > 620);
  // }, [props.width]);

  const getEndpoint = async (id) => {
    setStatus((status) => ({ ...status, loading: true, error: false }));

    await fetcher({ endpoint: `/apihub/endpoints/${id}`, method: "GET" })
      .then(({ success, data }) => {
        if (success) {
          setEndpoint(data);
          setStatus((status) => ({ ...status, error: false }));
        }
      })
      .catch((err) => {
        setEndpoint(null);
        setStatus((status) => ({ ...status, error: true }));
      })
      .finally(() => setStatus((status) => ({ ...status, loading: false })));
  };

  return <Endpoints getEndpoint={getEndpoint} endpoint={endpoint} status={status} />;
}

const mapStateToProps = (state) => ({
  width: state.layout.width,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
