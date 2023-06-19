import { connector, ConnectorProps } from "@store";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { styles, NavContainer, EndpointContainer } from ".";

export default connector((props: ConnectorProps) => {
  const [showEndpoints, setShowEndpoints] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setShowEndpoints(props.layout.width >= 620);
  }, [props.layout.width]);

  return (
    <main className={styles.endpoints}>
      <Grid container spacing={3}>
        <Grid item sm={4}>
          {showEndpoints ? <NavContainer /> : false}
        </Grid>
        <Grid item sm={8}>
          <EndpointContainer />
        </Grid>
      </Grid>
    </main>
  );
});
