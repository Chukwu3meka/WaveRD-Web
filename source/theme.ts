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
    },
  },
};

const theme = createTheme({});

const muiTheme = createTheme({
  typography: { fontFamily: '"Merienda", "Roboto Slab", serif' },

  palette: {
    primary: { main: "rgb(68, 139, 68)" },
    secondary: { main: "rgb(141, 202, 141)" },
  },

  components: {
    MuiInput: iPhoneInputFix,
    MuiTextField: iPhoneInputFix,
    MuiFilledInput: iPhoneInputFix,
    MuiOutlinedInput: iPhoneInputFix,
    MuiFormControl: iPhoneInputFix,

    MuiTypography: { styleOverrides: { root: { lineHeight: "1.7em", letterSpacing: "0.01em" } } },

    MuiPaper: { styleOverrides: { root: { padding: 5, boxSizing: "border-box" } } },

    MuiTable: { styleOverrides: { root: { minWidth: 300 } } },

    MuiTableCell: { styleOverrides: { head: { backgroundColor: theme.palette.common.black, color: theme.palette.common.white }, body: { fontSize: 14 } } },

    MuiButton: { styleOverrides: { root: { fontWeight: "900", letterSpacing: ".2em" } } },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
          "&:last-child td, &:last-child th": { border: 0 }, // <= hide last border
        },
      },
    },
  },
});

export default muiTheme;
