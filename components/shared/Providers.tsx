"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import muiTheme from "utils/utils/muiTheme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme("dark")}>
      <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </ThemeProvider>
  );
}
