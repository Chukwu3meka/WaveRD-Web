// "use client";

import { createTheme } from "@mui/material/styles";
import { Theme } from "interfaces/components/layouts.interface";
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

const initialTheme = createTheme({});

const MuiTheme = (theme: Theme) => {
  return createTheme({
    typography: {
      fontSize: 16,
      fontFamily: '"Merienda", "Roboto Slab", serif',
    },

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
      //   styleOverrides: { head: { backgroundColor: initialTheme.palette.common.black, color: initialTheme.palette.common.white }, body: { fontSize: 14 } },
      // },
      MuiButton: { styleOverrides: { root: { fontWeight: "600", letterSpacing: ".06em" } } },
      // MuiTableRow: {
      //   styleOverrides: {
      //     root: {
      //       "&:nth-of-type(odd)": { backgroundColor: initialTheme.palette.action.hover },
      //       "&:last-child td, &:last-child th": { border: 0 }, // <= hide last border
      //     },
      //   },
      // },
    },
  });
};

export default MuiTheme;
