import { MouseEventHandler, RefObject } from "react";
import { ConsoleData, GetGameWorldsResponse } from "interfaces/services/console.interface";

type RowAction = "modify" | "visibility" | "delete";

export interface ManageGameWorldsProps {
  filter: string;
  searching: boolean;
  setFilter: Function;
  actions?: RowAction;
  data: ConsoleData<GetGameWorldsResponse>;
  handlePageChange: Function;
  tableRef: RefObject<HTMLTableElement>;
  searchHandler: MouseEventHandler<HTMLButtonElement>;
  refreshEndpoints: MouseEventHandler<HTMLButtonElement>;
  rowActionHandler: (action: RowAction, id: string | null) => () => void;
  // toggleRowAction: (event: MouseEvent, params: RowAction) => () => void;
}
