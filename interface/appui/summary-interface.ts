export interface IAppUISummaryProps {
  fullwidth: boolean;
  data: IAppUISummary[];
}

export interface IAppUISummary {
  title: string;
  value: number;
  icon: JSX.Element;
  desc: string;
  color: "red" | "gold" | "green" | "purple";
}
