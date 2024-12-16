import { useDeleteData, useGetData, usePostData } from "@/hooks/apiService";
import { BorrowingInterface } from "@/interfaces/BorrowingInterface";
import { PaginationInterface } from "@/interfaces/PaginationInterface";
import {
  Add,
  CheckCircleOutlineRounded,
  DeleteOutlineOutlined,
  KeyboardArrowDownRounded,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Alert, Avatar, CircularProgress, Pagination } from "@mui/material";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const DashboardBorrowing = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [borrowings, setBorrowings] = useState<BorrowingInterface[] | null>(
    null
  );
  const [searchParam, setSearchParam] = useSearchParams();
  const [message, setMessage] = useState<{
    message: string | null;
    status: "success" | "error" | null;
  }>({ message: null, status: "success" });
  const [pagination, setPagination] = useState<PaginationInterface | null>(
    null
  );

  useEffect(() => {
    setTimeout(() => {
      message &&
        setMessage({
          message: null,
          status: null,
        });
    }, 8000);
  }, []);

  const setPage = (page: string) => {
    setSearchParam({ ...searchParam, page: page });
  };

  useEffect(() => {
    async function fetchBorrowing() {
      setLoading(true);
      const param = {
        perPage: searchParam.get("perPage"),
        page: searchParam.get("page"),
        status: searchParam.get("status"),
        categories: searchParam.get("categories"),
        email: searchParam.get("email"),
        title: searchParam.get("title"),
        isbn: searchParam.get("isbn"),
      };

      const result = await useGetData("/borrowings", param);
      if (result.status) {
        setMessage({ message: result.message, status: "success" });
        setPagination(result.pagination);
        setBorrowings(result.data);
      } else {
        setMessage({ message: result.message, status: "error" });
      }
      setLoading(false);
    }

    fetchBorrowing();
  }, []);

  const handleConfirmBorrowing = async (
    id: string,
    url: string,
    status: "borrowed" | "returned"
  ) => {
    try {
      const result = await usePostData(url, {});

      if (result.status) {
        setMessage({ message: result.message, status: "success" });

        setBorrowings((prevBorrowings) =>
          prevBorrowings
            ? prevBorrowings.map((borrowing) =>
                borrowing.id === id
                  ? { ...borrowing, status: status }
                  : borrowing
              )
            : []
        );
      } else {
        setMessage({ message: result.message, status: "error" });
      }
    } catch (error) {
      console.error("Error confirming borrowing:", error);
      setMessage({
        message: "Failed to confirm borrowing. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <div className="min-h-screen w-full p-6 overflow-x-hidden">
      <Alert
        className={clsx(
          { "translate-y-48": message.message },
          "right-1/2 translate-x-1/2 absolute -top-20  max-w-96 w-full text-justify transition-all duration-500 ease-linear z-[9999]"
        )}
        variant="filled"
        severity={message.status ? message.status : "info"}
      >
        {message.message}
      </Alert>
      <div className="min-w-full col-span-12 px-5 pt-3 pb-5 flex flex-col gap-y-6 rounded xl:rounded-lg bg-white">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-3 overflow-hidden">
          <h4 className="font-semibold text-xl">All Borrowings</h4>
          <div className="w-fit flex flex-col md:flex-row gap-y-2 gap-x-5">
            <div className="flex flex-row items-center gap-x-3">
              <p className="text-sm font-medium">Status</p>
              <div
                className="p-1 md:p-2.5 flex flex-row gap-1 md:gap-2 rounded-md text-sm font-bold text-purple-700
               bg-purple-100 cursor-pointer"
              >
                <p>Show More</p>
                <KeyboardArrowDownRounded sx={{ fontSize: 20 }} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-full rounded-md">
          <div className="w-full max-w-full overflow-auto scrollbar-thin">
            <div className="w-fit min-w-full px-1.5 md:px-4 py-2 flex flex-row items-center gap-x-4 justify-between rounded-t-md bg-slate-100 *:px-2 *:py-3 *:text-sm *:font-semibold ">
              <div className="min-w-28">Code</div>
              <div className="min-w-60">User</div>
              <div className="min-w-60">Book</div>
              <div className="min-w-32 text-center">Status</div>
              <div className="min-w-28 text-right">Action</div>
            </div>
            {!loading ? (
              borrowings &&
              borrowings?.map((borrowing: BorrowingInterface) => (
                <div
                  key={borrowing.id}
                  className="w-full px-1.5 md:px-4 py-2 flex flex-row items-center gap-x-4 justify-between border-b border-slate-100 *:px-2 *:py-3"
                >
                  <div className="w-28 text-sm align-left">
                    #{borrowing.id.split("-")[0]}...
                  </div>
                  <Link
                    to={`/dashboard/users?email=${borrowing.user.email}`}
                    className="min-w-60 flex flex-row items-center gap-x-2 text-sm text-end font-medium"
                  >
                    <Avatar
                      src={
                        borrowing.user.user_detail?.profile
                          ? borrowing.user.user_detail.profile
                          : borrowing.user.email
                      }
                    />
                    <div className="text-left">
                      <p>{borrowing.user.name}</p>
                      <p className="!font-normal text-xs">
                        {borrowing.user.email}
                      </p>
                    </div>
                  </Link>
                  <Link
                    to={`/books/${borrowing.book.id}`}
                    className="min-w-60 text-sm flex flex-row items-center gap-x-2"
                  >
                    <img
                      src={`${borrowing.book.cover}`}
                      alt=""
                      className="w-[30px] h-[50px] rounded-sm"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{borrowing.book.title}</p>
                      <p>{borrowing.book.ISBN}</p>
                    </div>
                  </Link>
                  <div className="h-full min-w-32 flex flex-row items-center justify-center">
                    <div
                      className={clsx(
                        "w-32 px-1 py-0.5 flex justify-center items-center text-sm text-center font-medium rounded",
                        {
                          "bg-red-100 text-red-500":
                            borrowing.status == "lost" ||
                            borrowing.status == "rejected",
                        }, // danger
                        {
                          "bg-yellow-100 text-yellow-500":
                            borrowing.status == "awaiting confirmation",
                        }, // warning
                        {
                          "bg-blue-100 text-blue-500":
                            borrowing.status == "borrowed",
                        }, // info
                        {
                          "bg-green-100 text-green-500":
                            borrowing.status == "returned",
                        } // success
                      )}
                    >
                      <p>{borrowing.status}</p>
                    </div>
                  </div>
                  <div className="min-w-28 flex flex-row justify-end items-end gap-x-1 *:cursor-pointer">
                    <Link
                      to={`/dashboard/borrowings/${borrowing.id}`}
                      className="p-1 rounded bg-blue-100"
                    >
                      <RemoveRedEyeOutlined className="text-blue-600" />
                    </Link>
                    {borrowing.status === "awaiting confirmation" ||
                    borrowing.status === "borrowed" ? (
                      <div className="p-1 rounded bg-green-100">
                        <CheckCircleOutlineRounded
                          onClick={
                            borrowing.status === "awaiting confirmation"
                              ? () =>
                                  handleConfirmBorrowing(
                                    borrowing.id,
                                    `/borrowings/confirm/${borrowing.id}`,
                                    "borrowed"
                                  )
                              : () =>
                                  handleConfirmBorrowing(
                                    borrowing.id,
                                    `/borrowings/return/${borrowing.id}`,
                                    "returned"
                                  )
                          }
                          className="text-green-600"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full min-h-48 flex flex-row items-center justify-center gap-x-4">
                <p>Loading </p>
                <CircularProgress color="info" size={30} />
              </div>
            )}
          </div>
        </div>
        {pagination &&
          Math.ceil(pagination.totalData / pagination.perPage) > 1 && (
            <Pagination
              count={Math.ceil(pagination.totalData / pagination.perPage)}
              page={
                searchParam.get("page")
                  ? parseInt(searchParam.get("page") as string)
                  : 1
              }
              onChange={(_, num) => setPage(String(num))}
              variant="outlined"
              shape="rounded"
            />
          )}
      </div>
    </div>
  );
};

export default DashboardBorrowing;
