// "use client";

import { createTheme } from "@mui/material/styles";
import stylesVariables from "styles/variables.module.scss";

import { Theme } from "interfaces/store/layout.interfaces";

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

const inititalTheme = createTheme({});

export default function muiTheme(theme: Theme) {
  return createTheme({
    typography: { fontFamily: '"Merienda", "Roboto Slab", serif' },

    palette: {
      mode: theme,
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
      // MuiTableCell: {
      //   styleOverrides: { head: { backgroundColor: inititalTheme.palette.common.black, color: inititalTheme.palette.common.white }, body: { fontSize: 14 } },
      // },
      // MuiButton: { styleOverrides: { root: { fontWeight: "900", letterSpacing: ".2em" } } },
      // MuiTableRow: {
      //   styleOverrides: {
      //     root: {
      //       "&:nth-of-type(odd)": { backgroundColor: inititalTheme.palette.action.hover },
      //       "&:last-child td, &:last-child th": { border: 0 }, // <= hide last border
      //     },
      //   },
      // },
    },
  });
}
