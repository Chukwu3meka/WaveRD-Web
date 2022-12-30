export interface AppUITableContainerProps {
  handlePageChange: Function;
  activeEntry: string | number | null;
  rowsPerPage: number;
  page: number;
  totalEntries: number;
  fetchingEntries: boolean;
  customTableHead: ICustomTableHead[];
  customTableBody: ICustomTableBody[];
}

export interface IAppUITableProps {
  totalEntries: number;
  page: number;
  rowsPerPage: number;
  activeEntry: string | number | null;
  handlePageChange: Function;
  fetchingEntries: boolean;
  tableRef: any;
  customTableHead: ICustomTableHead[];
  customTableBody: ICustomTableBody[];
}

export interface ICustomTableHead {
  display: boolean;
  title: string;
  align?: "left" | "right" | "center";
}

export interface ICustomTableBody {
  cells: CustomTableBodyCells[];
  id: number | string;
}

type CustomTableBodyCells = {
  jsx: JSX.Element;
  style?: object;
  align?: "left" | "right" | "center";
};

export interface AppUITableParentComponentProps {
  page: number;
  openEntryHandler: Function;
  activeEntry: string | number | null;
  rowsPerPage: number;
  totalEntries: number;
  handlePageChange: Function;
  openDeleteDialog: Function;
  fetchingEntries: boolean;
}
