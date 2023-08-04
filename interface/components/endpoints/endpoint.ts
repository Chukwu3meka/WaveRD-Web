export interface Endpoint {
  snippets: Snippets;
  title: string;
  description: string;
  response: string;
  id: string;
}

interface Snippets {
  curl: Format;
  fetch: Format;
  [key: string]: any;
}

type Format = {
  title: string;
  snippet: string;
};

export interface SnippetsContainerProps {
  snippets: Snippets;
  theme: string;
}
