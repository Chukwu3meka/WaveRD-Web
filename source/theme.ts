import { createTheme } from "@mui/material/styles";

const iPhoneInputFix = {
  styleOverrides: {
    root: {
      "*": {
        // to prevent mui input not working on iPhone
        WebkitUserSelect: "text !important" /* Chrome, Opera, Safari */,
        MozUserSelect: "text !important" /* Firefox 2+ */,
        MsUserSelect: "text !important" /* IE 10+ */,
        userSelect: "text !important" /* Standard syntax */,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#913a3a !important",
        },
        "&:hover fieldset": {
          borderColor: "#F26161 !important",
        },
      },
    },
  },
};

const theme = createTheme({});

const muiTheme = createTheme({
  typography: {
    // fontFamily: "'Playfair Display', serif",
    fontFamily: "'Roboto Slab', serif",
  },

  palette: {
    // primary: {
    //   main: "#ad2723",
    // },
    // secondary: {
    //   main: "#a8a8a8",
    // },

    // text: {
    //   primary: "#1e3952",
    //   secondary: "#7E7C7C",
    //   // light: "#E0D4D4",
    // },

    primary: {
      main: "rgb(68, 139, 68)",
    },
    secondary: {
      main: "rgb(141, 202, 141)",
    },
    // success: {
    //   main: "rgb(68, 139, 68)",
    //   // main: "rgb(141, 202, 141)",
    // },
    // error: {
    //   main: "#1197c0",
    // },
    // neutral: {
    //   main: "#1778FF",
    //   contrastText: "#fff",
    // },
  },

  components: {
    // MuiInputLabel: iPhoneInputFix,
    MuiInput: iPhoneInputFix,
    MuiTextField: iPhoneInputFix,
    MuiFilledInput: iPhoneInputFix,
    // FormControl: iPhoneInputFix,
    MuiOutlinedInput: iPhoneInputFix,
    MuiFormControl: iPhoneInputFix,
    MuiPaper: {
      styleOverrides: {
        root: {
          // color,
          padding: 5,
          boxSizing: "border-box",
          // cursor: "pointer",
          // background,
          // padding: 5,
          // overflow: "hidden",
          // boxSizing: "border-box",
          // // borderRadius: 5,
          // margin: "10px auto",
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          minWidth: 300,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "900",
          letterSpacing: ".2em",
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
          },
          // hide last border
          "&:last-child td, &:last-child th": {
            border: 0,
          },
        },
      },
    },
  },
});

export default muiTheme;
