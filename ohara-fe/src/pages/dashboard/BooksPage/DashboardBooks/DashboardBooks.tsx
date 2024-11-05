import {
  Add,
  DeleteOutlineOutlined,
  EditNoteOutlined,
  KeyboardArrowDownRounded,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSearchBooks } from "../../../../context/SearchBooksContext/SearchBooksContext";
import { BookInterface } from "../../../../interfaces/BookInterface";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";

const DashboardBooksPage = () => {
  const { books } = useSearchBooks();

  return (
    <DashboardLayout>
      <div className="min-w-full col-span-12 px-5 pt-3 pb-5 flex flex-col gap-y-6 rounded xl:rounded-lg bg-white overflow-x-hidden">
        <div className="w-full flex flex-col md:flex-row justify-between gap-y-3 overflow-hidden">
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
        <div className="w-full min-h-96 max-w-full p-6 bg-white rounded-md">
          <div className="w-full max-w-full overflow-auto *:w-full *:px-1.5 *:md:px-4 *:py-2 *:flex *:flex-row *:items-center *:border-b *:border-dashed *:gap-x-4 *:justify-between">
            <div className=" *:text-sm *:font-semibold">
              <div className="min-w-28">Code</div>
              <div className="min-w-40">Book</div>
              <div className="min-w-28 text-center">Stock</div>
              <div className="min-w-28 text-right">Author</div>
              <div className="min-w-28 text-right">Action</div>
            </div>
            {books?.map((book: BookInterface) => (
              <div
                key={book.id}
                className="flex flex-row gap-x-4 border-b border-dashed"
              >
                <div className="min-w-28 text-sm align-left">
                  #{book.id}
                </div>
                <div className="min-w-40 text-sm flex flex-row items-center gap-x-2">
                  <img src={book.cover} alt="" className="w-[30px] h-[50px]" />
                  <div className="flex flex-col">
                    <p className="font-semibold">{book.title}</p>
                    <p>{book.ISBN}</p>
                  </div>
                </div>
                <div className="h-full min-w-28 flex flex-row items-center justify-center">
                  <div className="w-16 h-6 flex justify-center items-center bg-green-100 text-green-600 font-medium rounded">
                    <p>{book.stock}</p>
                  </div>
                </div>
                <div className="min-w-28 text-sm text-end font-semibold">
                  Nama guwa
                </div>
                <div className="min-w-28 flex flex-row justify-center items-end gap-x-1">
                  <div className="p-1 rounded bg-blue-100">
                    <RemoveRedEyeOutlined className="text-blue-600" />
                  </div>
                  <Link
                    to={`/dashboard/books/edit/${book.id}`}
                    className="p-1 rounded bg-yellow-100"
                  >
                    <EditNoteOutlined className="text-yellow-600" />
                  </Link>
                  <div className="p-1 rounded bg-red-100">
                    <DeleteOutlineOutlined className="text-red-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardBooksPage;
