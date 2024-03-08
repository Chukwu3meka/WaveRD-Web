import { createTheme } from "@mui/material/styles";

const iPhoneInput = {
  styleOverrides: {
    root: {
      "*": {
        // to prevent mui input not working on iPhone
        WebkitUserSelect: "text !important" /* Chrome, Opera, Safari */,
        MozUserSelect: "text !important" /* Firefox 2+ */,
        MsUserSelect: "text !important" /* IE 10+ */,
        userSelect: "text !important" /* Standard syntax */,
      },
    },
  },
};

const theme = createTheme({});

// Create a theme instance.
const muiTheme = createTheme({
  typography: {
    fontFamily: '"Merienda", cursive',
  },
  palette: {
    primary: {
      main: "rgb(68, 139, 68)",
    },
    secondary: {
      main: "rgb(141, 202, 141)",
      // contrastText: "#fff",
    },
    spacing: 24,
  },

  components: {
    MuiInput: iPhoneInput,
    MuiTextField: iPhoneInput,
    MuiFilledInput: iPhoneInput,
    MuiOutlinedInput: iPhoneInput,

    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 5,
          overflow: "hidden",
          boxSizing: "border-box",
          // borderRadius: 5,
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
          cursor: "pointer",
        },
        body: {
          fontSize: 14,
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
