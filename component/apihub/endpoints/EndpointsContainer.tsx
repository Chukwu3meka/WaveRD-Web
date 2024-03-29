import { useState } from "react";
import { connect } from "react-redux";

import { Endpoints } from ".";
import fetcher from "@utils/fetcher";

const EndpointsContainer = (props) => {
  const [endpoint, setEndpoint] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: false });

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
};

const mapStateToProps = (state) => ({
  width: state.layout.width,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
