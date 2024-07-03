import CheckIcon from "@mui/icons-material/Check";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { MouseEventHandler, RefObject } from "react";
import { DailyStatResponse } from "interfaces/services/console.interface";
import { Button, Grid, LinearProgress, CircularProgress, Box, FormControl, InputLabel, OutlinedInput, Stack } from "@mui/material";

interface CreateWorldProps {
  // filter: string;
  // searching: boolean;
  // setFilter: Function;
  // handlePageChange: Function;
  // tableRef: RefObject<HTMLTableElement>;
  // searchHandler: MouseEventHandler<HTMLButtonElement>;
  // data: {
  //   filter: string;
  //   loading: boolean;
  //   page: number;
  //   rows: number;
  //   content: DailyStatResponse[];
  //   total: number;
  // };

  // progress: { activity: string; status: "pending" | "processing" | "success" | "failed" }[];

  titleHandler: (e: any, status: boolean) => void;

  createWorldHandler: MouseEventHandler<HTMLButtonElement>;
  progress: {
    id: number;
    status: "pending" | "processing" | "success" | "failed";
    activity: string;
  }[];

  formData: {
    title: string;
    loading: boolean;
  };
}

const CreateWorld = ({ createWorldHandler, progress, formData, titleHandler }: CreateWorldProps) => (
  <main style={{ width: "100%", maxWidth: 600 }}>
    <Stack mb={1} py={1} direction="row" spacing={1} alignItems="center">
      <FormControl fullWidth variant="outlined" sx={{ maxWidth: 300 }} size="small">
        <InputLabel htmlFor="outlined-adornment-password">Game world title</InputLabel>
        <OutlinedInput
          id="title"
          label="Game world title"
          //
          // value={formData.title.value}
          onBlur={(e) => titleHandler(e, true)}
          onChange={(e) => titleHandler(e, false)}
          // disabled={formData.options.composing}
          // error={!formData.title.valid && !formData.title.validating}

          placeholder="Game world title"
          inputProps={{ autoComplete: "new-password", form: { autoComplete: "off" } }}

          // endAdornment={
          //   formData.title.validating ? (
          //     <InputAdornment position="end">
          //       <IconButton aria-label="validating title" edge="end" sx={{ ml: -1 }}>
          //         <CircularProgress color="success" size={20} />
          //       </IconButton>
          //     </InputAdornment>
          //   ) : (
          //     <></>
          //   )
          // }
        />
      </FormControl>

      <Button
        id="signin"
        // size="small"
        // href=""
        type="submit"
        color="primary"
        variant="contained"
        onClick={createWorldHandler}
        disabled={formData.loading}
        //
      >
        Create
      </Button>
    </Stack>

    <Box border="3px solid var(--secondary-color)" borderRadius={2} px={1}>
      {progress.map(({ activity, id, status }, i) => (
        <Grid
          container
          spacing={1.5}
          alignItems="center"
          fontSize=".8em"
          height={50}
          ml={-0.8}
          pr={1}
          key={id}
          borderBottom="3px solid var(--secondary-color)">
          <Grid item xs={11} sm={11} md={11} mb={-0.5}>
            {activity}
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Box textAlign="center">
              {status === "failed" ? (
                <ReportProblemIcon color="error" fontSize="small" sx={{ mb: -1 }} />
              ) : status === "success" ? (
                <CheckIcon color="success" />
              ) : status === "pending" ? (
                <LinearProgress color="warning" variant="query" />
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
