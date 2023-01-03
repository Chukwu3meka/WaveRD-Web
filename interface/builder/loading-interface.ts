export interface IBuilderLoadingContainer {
  height?: string;
  status: boolean;
  component: JSX.Element;
}

export interface IBuilderLoading extends IBuilderLoadingContainer {
  colorScheme: string[];
}
