import { useEffect, useState } from "react";

import { InputStatus } from ".";

const InputStatusContainer = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("invalid");

  // ? Ensure user has started typing before displaying input status
  useEffect(() => {
    if (!props.pristine) {
      setVisible(true);
      setStatus(props.status);
      setLoading(props.status === "loading");
    }
  }, [props.value, props.status]); // <= value is required from parent component to always cause a re-render

  useEffect(() => {
    // remove input status after 4 seconds
    const interval = setInterval(() => setTimeout(() => setVisible(false)), 4000);
    return () => clearInterval(interval);
  }, []);

  return <InputStatus visible={visible} status={status} loading={loading} />;
};

export default InputStatusContainer;
