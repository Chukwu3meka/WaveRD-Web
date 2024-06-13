// "use client";

import { createTheme } from "@mui/material/styles";
import { Theme } from "interfaces/components/others/layouts.interface";

import stylesVariables from "styles/variables.module.scss";

// const iPhoneInputFix = {
//   styleOverrides: {
//     root: {
//       "*": {
//         // to prevent mui input not working on iPhone
//         WebkitUserSelect: "text !important" /* Chrome, Opera, Safari */,
//         MozUserSelect: "text !important" /* Firefox 2+ */,
//         MsUserSelect: "text !important" /* IE 10+ */,
//         userSelect: "text !important" /* Standard syntax */,
//       },
//     },
//   },
// };

const theme = createTheme({});

const muiTheme = (mode: Theme) =>
  createTheme({
    typography: {
      fontSize: 16,
      fontFamily: '"Merienda", "Roboto Slab", serif',
    },

    palette: {
      mode: mode,
      primary: { main: stylesVariables.primaryColor || "#fffff" },
      secondary: { main: stylesVariables.secondaryColor || "#fffff" },
    },

    components: {
      // MuiInput: iPhoneInputFix,
      // MuiTextField: iPhoneInputFix,
      // MuiFilledInput: iPhoneInputFix,
      // MuiOutlinedInput: iPhoneInputFix,
      // MuiFormControl: iPhoneInputFix,
      // MuiTypography: { styleOverrides: { root: { lineHeight: "1.7em", letterSpacing: "0.01em" } } },
      // MuiPaper: { styleOverrides: { root: { padding: 5, boxSizing: "border-box" } } },
      // MuiTable: { styleOverrides: { root: { minWidth: 300 } } },
      MuiTableCell: {
        styleOverrides: {
          body: { fontSize: 14 },
          head: {
            height: 70,
            color: theme.palette.common.white,
            backgroundColor: theme.palette.common.black,
          },
        },
      },
      MuiButton: { styleOverrides: { root: { fontWeight: "600", letterSpacing: ".06em" } } },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:nth-of-type(odd)": { background: theme.palette.action.hover },
            "&:last-child td, &:last-child th": { border: 0 }, // <= hide last border
          },
        },
      },
    },
  });

export default muiTheme;
