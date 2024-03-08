import { createTheme } from "@mui/material/styles";

const color = "#424242";
const background = "#fffffa ";

const muiTheme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: "Vollkorn, serif",
    // fontFamily: "'Merienda', cursive",
    //   allVariants: {
    //     color,
    //   },
  },

  palette: {
    text: {
      primary: "#1e3952",
      secondary: "#7E7C7C",
      light: "#E0D4D4",
    },
    primary: {
      main: "#e2ad26",
    },
    secondary: {
      main: "#1197c0",
    },
    neutral: {
      main: "#1778FF",
      contrastText: "#fff",
    },
    // info: {
    //   main: "#424242",
    // },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // color,
          padding: 5,
          boxSizing: "border-box",
          // cursor: "pointer",
          // background,
        },
      },
    },
    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       // color,
    //     },
    //   },
    // },
  },
});

export default muiTheme;
