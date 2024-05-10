import { Theme } from "interfaces/components/others/layouts.interface";

export interface GAAppraisalHistoryProps {
  page: number;
  rowsPerPage: number;
  noOfSkelenton: number;
  totalRequest: number;
  toggleViewRequest: Function;
  rowsPerPageFn: Function;
  // requests: GAAppraisalRequest[];
  requests: any[];
  fetchingRequests: boolean;
  handleChangePage: Function;
}
