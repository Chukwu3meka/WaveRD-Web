import { useEffect, useState } from "react";

// import { IInputStatus } from "@interface/components/others/inputStatus";

import { InputStatus } from ".";

// const InputStatus = (props: IInputStatus) => {
const InputStatusContainer = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("invalid");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ? Ensure user has started typing before displaying input status

    console.log(props.value, props.status);

    if (!props.pristine) {
      setVisible(true);
      setStatus(props.status);
      setLoading(props.status === "loading");
    }
  }, [props.value, props.status]); // <= value is required from parent component to always cause a re-render

  // useEffect(() => {
  //   console.log(props.status, props.value);

  //   // // ? Ensure user has started typing before displaying input status
  //   // if (!props.pristine) {
  //   setVisible(true);
  //   setStatus(props.status);
  //   // }
  // }, [props.status]); // <= value is required from parent component to always cause a re-render

  useEffect(() => {
    // remove input status after 4 seconds
    const interval = setInterval(() => setTimeout(() => setVisible(false)), 4000);
    return () => clearInterval(interval);
  }, []);

  return <InputStatus visible={visible} status={status} loading={loading} />;
};

export default InputStatusContainer;
