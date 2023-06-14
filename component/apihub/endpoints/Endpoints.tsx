import { connector, ConnectorProps } from "@store";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { MobileContainer, styles, NavContainer, EndpointContainer } from ".";

export default connector((props: ConnectorProps) => {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setMobile(props.layout.width <= 620);
  }, [props.layout.width]);

  return mobile ? (
    <>
      <MobileContainer />
      <EndpointContainer />
    </>
  ) : (
    <main className={styles.endpoints}>
      <Grid container spacing={3}>
        <Grid item sm={4}>
          <NavContainer />
        </Grid>
        <Grid item sm={8}>
          <EndpointContainer />
        </Grid>
      </Grid>
    </main>
  );
});
