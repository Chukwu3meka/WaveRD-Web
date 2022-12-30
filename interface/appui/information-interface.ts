export interface IAppUIInformationProps {
  information: IAppUIInformation[];
  closeDrawer: Function;
}

export interface IAppUIInformation {
  label: string;
  data: string | number;
}
