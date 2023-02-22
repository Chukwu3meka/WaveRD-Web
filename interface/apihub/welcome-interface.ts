export interface IWelcome {
  setCurrColorFn: Function;
  currColor: string;
  dataCovered: dataCovered[];
}

type dataCovered = {
  title: string;
  description: string;
  path: string;
};
