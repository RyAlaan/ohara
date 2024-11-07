import {
  Add,
  DeleteOutlineOutlined,
  EditNoteOutlined,
  KeyboardArrowDownRounded,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Alert, Avatar, CircularProgress, Pagination } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useSearchBooks } from "../../../../context/SearchBooksContext/SearchBooksContext";
import { BookInterface } from "../../../../interfaces/BookInterface";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useEffect, useState } from "react";
import { useDeleteData, useGetData } from "@/hooks/apiService";
import { PaginationInterface } from "@/interfaces/PaginationInterface";
import { clsx } from "clsx";

const DashboardBooksPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookInterface[] | null>(null);
  const [searchParam, setSearchParam] = useSearchParams();
  const [message, setMessage] = useState<{
    message: string | null;
    status: "success" | "error" | null;
  }>({ message: null, status: "success" });
  const [pagination, setPagination] = useState<PaginationInterface | null>(
    null
  );

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const param = {
        perPage: searchParam.get("perPage"),
        page: searchParam.get("page"),
        name: searchParam.get("name"),
        title: searchParam.get("title"),
        id: searchParam.get("id"),
      };

      const result = await useGetData("/books", param);
      if (result.status) {
        setMessage({ message: result.message, status: "success" });
        setPagination(result.pagination);
        setBooks(result.data);
      } else {
        setMessage({ message: result.message, status: "error" });
      }
      setLoading(false);
    }

    fetchUser();
  }, [searchParam.get("page")]);

  const setPage = (page: string) => {
    setSearchParam({ ...searchParam, page: page });
  };

  const deleteBook = async (id: string) => {
    setLoading(true);
    const result = await useDeleteData(`/users/${id}`);
    if (result.status) {
      // window.location.reload();
      setMessage({ message: result.message, status: "success" });
    } else {
      setMessage({ message: result.message, status: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full p-6 overflow-hidden">
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
      <div className="min-w-full col-span-12 px-5 pt-3 pb-5 flex flex-col gap-y-6 rounded xl:rounded-lg bg-white overflow-x-hidden">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-3 overflow-hidden">
          <h4 className="font-semibold text-xl">All Books</h4>
          <div className="w-fit flex flex-col md:flex-row gap-y-2 gap-x-5">
            <div className="flex flex-row items-center gap-x-3">
              <p className="text-sm font-medium">Categories</p>
              <div
                className="p-1 md:p-2.5 flex flex-row gap-1 md:gap-2 rounded-md text-sm font-bold text-purple-700
               bg-purple-100 cursor-pointer"
              >
                <p>Show More</p>
                <KeyboardArrowDownRounded sx={{ fontSize: 20 }} />
              </div>
            </div>
            <Link
              to={"/dashboard/books/add"}
              className="w-fit p-2 md:p-2.5 flex flex-row gap-1 md:gap-2 rounded-md text-sm font-bold text-purple-700 bg-purple-100"
            >
              <Add sx={{ fontSize: 20 }} />
              <p>Add Book</p>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-full rounded-md">
          <div className="w-full max-w-full overflow-auto scrollbar-thin">
            <div className="w-fit min-w-full px-1.5 md:px-4 py-2 flex flex-row items-center gap-x-4 justify-between rounded-t-md bg-slate-100 *:px-2 *:py-3 *:text-sm *:font-semibold ">
              <div className="min-w-28">Code</div>
              <div className="min-w-60">Book</div>
              <div className="min-w-28 text-center">Stock</div>
              <div className="min-w-48 text-right">Author</div>
              <div className="min-w-40 text-right">Action</div>
            </div>
            {!loading ? (
              books &&
              books?.map((book: BookInterface) => (
                <div
                  key={book.id}
                  className="w-full px-1.5 md:px-4 py-2 flex flex-row items-center gap-x-4 justify-between border-b border-slate-100 *:px-2 *:py-3"
                >
                  <Link
                    to={`/dashboard/books/${book.id}`}
                    className="min-w-28 text-sm align-left"
                  >
                    #{book.id}
                  </Link>
                  <div className="min-w-60 text-sm flex flex-row items-center gap-x-2">
                    <img
                      src={book.cover}
                      alt=""
                      className="w-[30px] h-[50px]"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold">{book.title}</p>
                      <p>{book.ISBN}</p>
                    </div>
                  </div>
                  <div className="h-full min-w-28 flex flex-row items-center justify-center">
                    <div
                      className={clsx(
                        "w-16 h-6 flex justify-center items-center font-medium rounded",
                        { "rounded bg-red-100 text-red-500": book.stock <= 0 }, // danger
                        {
                          "rounded bg-yellow-100 text-yellow-500":
                            book.stock < 10,
                        }, // warning
                        {
                          "rounded bg-green-100 text-green-500":
                            book.stock >= 10,
                        } // success
                      )}
                    >
                      <p>{book.stock}</p>
                    </div>
                  </div>
                  <div className="min-w-48 text-sm text-end font-semibold">
                    Nama guwa
                  </div>
                  <div className="min-w-40 flex flex-row justify-center items-end gap-x-1 *:cursor-pointer">
                    <div className="p-1 rounded bg-blue-100">
                      <RemoveRedEyeOutlined className="text-blue-600" />
                    </div>
                    <Link
                      to={`/dashboard/books/edit/${book.id}`}
                      className="p-1 rounded bg-yellow-100"
                    >
                      <EditNoteOutlined className="text-yellow-600" />
                    </Link>
                    <div
                      className="p-1 rounded bg-red-100"
                      onClick={() => deleteBook(book.id)}
                    >
                      <DeleteOutlineOutlined className="text-red-600" />
                    </div>
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

export default DashboardBooksPage;
