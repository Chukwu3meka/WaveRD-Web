"use client";

import stylesVariables from "styles/variables.module.scss";

import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AntProviderProps } from "interfaces/components/others/providers.interface";

const AntProvider = ({ children, theme: userTheme }: AntProviderProps) => {
  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: userTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,

        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],

        token: {
          colorPrimary: stylesVariables.primaryColor || "#fffff",
          // colorFillSecondary:stylesVariables.secondaryColor || "#fffff"
        },
      }}>
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  );
};

export default AntProvider;
