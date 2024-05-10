"use client";

import { useState } from "react";
import { Endpoints } from ".";
import { enqueueSnackbar } from "notistack";

const EndpointsContainer = ({ endpoints }: any) => {
  console.log("endpoints first", { endpoints });

  const [page, setPage] = useState(0),
    [viewRequest, setViewRequest] = useState<null | any>(null),
    [requests, setRequests] = useState<any[]>([]),
    [fetchingRequests, setFetchingRequests] = useState(true),
    [fetchingRequest, setFetchingRequest] = useState(true),
    [noOfSkelenton, setNoOfSkelenton] = useState(0),
    [totalRequest, setTotalRequest] = useState(0),
    [rowsPerPage, setRowsPerPage] = useState(20);

  const [data, setData] = useState({
    loading: false,
    page: endpoints?.page || 0,
    rows: endpoints?.size || 20,
    skeleton: endpoints?.size || 20,
    content: endpoints?.content || [],
    total: endpoints?.totalElements || 0,
  });

  const getRequest = async (page: number, rowsPerPage: number) => {
    setFetchingRequests(true);

    const expectedRequests = page * rowsPerPage + rowsPerPage,
      availRequests = rowsPerPage === expectedRequests ? 0 : totalRequest + rowsPerPage - expectedRequests;

    setNoOfSkelenton(availRequests || rowsPerPage);

    // await fetcher({ endpoint: `/gaAppraisalRequest?_page${page}&_limit=${rowsPerPage}`, method: "get" })
    //   .then((res) => {
    //     setRequests(res.data);
    //     setTotalRequest(Number(res.headers["x-total-count"]));
    //   })
    //   .catch(() => enqueueSnackbar("Failed to retrieve data", { variant: "error" }));

    setFetchingRequests(false);
  };

  const handleChangePage = async (newPage: number) => {
    setPage(newPage);
    getRequest(newPage, rowsPerPage);
  };

  const rowsPerPageFn = (value: number) => {
    setPage(0);
    getRequest(0, +value);
    setRowsPerPage(+value);
  };

  const toggleViewRequest = async (event: React.KeyboardEvent | React.MouseEvent, id: null | any = null) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) return;

    setViewRequest(id);

    if (id) {
      setFetchingRequest(true);

      // await fetcher({ endpoint: `/gaAppraisalRequest/${id}`, method: "get" })
      //   .then((res) => setViewRequest(res.data))
      //   .catch(() => enqueueSnackbar("Failed to retrieve data", { variant: "error" }))
      //   .finally(() => setFetchingRequest(false));
    }
  };

  return (
    <Endpoints
      data={data}
      endpoints={endpoints}
      page={page}
      rowsPerPage={rowsPerPage}
      totalRequest={totalRequest}
      noOfSkelenton={noOfSkelenton}
      fetchingRequests={fetchingRequests}
      handleChangePage={handleChangePage}
      toggleViewRequest={toggleViewRequest}
      rowsPerPageFn={rowsPerPageFn}
    />
  );
};

export default EndpointsContainer;
