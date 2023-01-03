import { ChangeEvent, createRef, RefObject } from "react";

import { AppUITable } from ".";
import { AppUITableContainerProps } from "@interface/builder/table-interface";

const AppUITableContainer = ({
  page,
  activeEntry,
  rowsPerPage,
  totalEntries,
  fetchingEntries,
  customTableHead,
  customTableBody,
  handlePageChange: propsHandlePageChange,
}: AppUITableContainerProps) => {
  const tableRef: RefObject<HTMLInputElement> = createRef();

  const handlePageChange = (event: ChangeEvent<HTMLInputElement>, page: number): void => {
    if (tableRef.current) tableRef.current.scrollIntoView(); // <= Scroll to top of table
    propsHandlePageChange(page);
  };

  return (
    <AppUITable
      {...{
        page,
        tableRef,
        activeEntry,
        rowsPerPage,
        totalEntries,
        fetchingEntries,
        customTableHead,
        customTableBody,
        handlePageChange,
      }}
    />
  );
};
export default AppUITableContainer;
