import { MouseEventHandler } from "react";
import { ReportProblem as ReportProblemIcon, Check as CheckIcon } from "@mui/icons-material";
import { Button, Grid, CircularProgress, Box, FormControl, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";

type Status = "pending" | "success" | "failed";

interface CreateWorldProps {
  titleHandler: (e: any, status: boolean) => void;
  progress: { status: Status; activity: string }[];
  createWorldHandler: MouseEventHandler<HTMLButtonElement>;
  formData: { title: string; loading: boolean; invalid: boolean };
}

const CreateWorld = ({ createWorldHandler, progress, formData, titleHandler }: CreateWorldProps) => (
  <main style={{ width: "100%", maxWidth: 900, overflow: "hidden" }}>
    <Stack mb={1} py={1} direction="row" spacing={1} alignItems="center">
      <FormControl fullWidth variant="outlined" sx={{ maxWidth: 300 }} size="small">
        <InputLabel htmlFor="outlined-adornment-password">Game world title</InputLabel>
        <OutlinedInput
          id="title"
          value={formData.title}
          label="Game world title"
          error={formData.invalid}
          disabled={formData.loading}
          placeholder="Game world title"
          onBlur={(e) => titleHandler(e, true)}
          onChange={(e) => titleHandler(e, false)}
          inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}
        />
      </FormControl>

      <Button id="signin" type="submit" color="primary" variant="contained" onClick={createWorldHandler} disabled={formData.loading}>
        Create
      </Button>
    </Stack>

    <Box border="3px solid var(--secondary-color)" borderRadius={2} px={1} minHeight={300} maxHeight="60vh" sx={{ overflowY: "auto" }}>
      {progress.map(({ activity, status }, i) => (
        <Grid
          pr={1}
          key={i}
          ml={-0.8}
          container
          spacing={1.5}
          minHeight={50}
          fontSize=".8em"
          alignItems="center"
          borderBottom="3px solid var(--secondary-color)">
          <Grid item xs={11} sm={11} md={11} mb={-0.5}>
            <Typography>{activity}</Typography>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Box textAlign="center">
              {status === "failed" ? (
                <ReportProblemIcon color="error" fontSize="small" sx={{ mb: -1 }} />
              ) : status === "success" ? (
                <CheckIcon color="success" />
              ) : (
                <CircularProgress size={20} sx={{ mb: -0.5 }} />
              )}
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  </main>
);

export default CreateWorld;
