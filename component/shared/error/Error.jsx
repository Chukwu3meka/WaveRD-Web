import { Button, Box, Typography } from "@mui/material";

import { styles } from ".";

function Error({ title, others, errorHandler, description, ErrorIcon }) {
  return (
    <div className={styles.error} {...others}>
      <span>
        <ErrorIcon fontSize="large" />
        <Typography variant="h6" align="center">
          {title}
        </Typography>
      </span>
      <Typography variant="body2" color="textSecondary" align="center">
        {description}
      </Typography>
      {errorHandler && (
        <Button size="small" variant="outlined" fullWidth onClick={errorHandler}>
          Refresh Content
        </Button>
      )}
    </div>
  );
}

export default Error;
