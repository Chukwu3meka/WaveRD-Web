export interface IBuilderLoadingContainer {
  height?: string;
  loading: boolean;
  component: JSX.Element;
}

export interface IBuilderLoading extends IBuilderLoadingContainer {
  colorScheme: string[];
}
