import SyntaxHighlighter from "react-syntax-highlighter";

import { codeFormat } from "utils/helpers";
import { docco, darcula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { EndpointResponseProps } from "interfaces/components/apihub/endpoint.interface";

const EndpointResponse = ({ path, response, theme }: EndpointResponseProps) => (
  <SyntaxHighlighter showLineNumbers language="json" style={theme === "dark" ? darcula : docco} customStyle={{ borderRadius: "10px" }}>
    {` // ${path.substring(1)} \n\n ${codeFormat(response)}`}
  </SyntaxHighlighter>
);

export default EndpointResponse;
