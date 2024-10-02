import {
  Add,
  DeleteOutlineOutlined,
  EditNoteOutlined,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const DashboardBooksPage = () => {
  return (
    <div className="min-h-screen w-full p-6">
      <div className="min-h-screen min-w-[586px] w-full px-5 pt-3 pb-5 flex flex-col gap-y-6 rounded xl:rounded-lg bg-white">
        <div className="w-full flex flex-row justify-between">
          <h4 className="font-semibold text-xl">All Books</h4>
          <div className="w-fit flex flex-row gap-x-5">
            <div className="flex flex-row items-center gap-x-3">
              <p className="font-medium">Categories</p>
              <div
                className="p-2.5 flex flex-row gap-2 rounded-md font-bold text-purple-700
               bg-purple-100 cursor-pointer"
              >
                <p>Show More</p>
                <KeyboardArrowDownRounded />
              </div>
            </div>
            <Link
              to={"/dashboard/books/add"}
              className="p-2.5 flex flex-row gap-2 rounded-md font-bold text-purple-700 bg-purple-100"
            >
              <Add></Add>
              <p>Add Book</p>
            </Link>
          </div>
        </div>
        <div className="min-h-96 w-full bg-white rounded-md">
          <table className="w-full">
            <thead className="border-b border-dashed">
              <tr>
                <th className="min-w-24 py-3 text-start text-sm font-semibold">
                  Code
                </th>
                <th className="min-w-28  py-3 text-start text-sm font-semibold">
                  Manga
                </th>
                <th className="min-w-16  py-3 text-end text-sm font-semibold">
                  Total Volume
                </th>
                <th className="min-w-32  py-3 text-end text-sm font-semibold">
                  Author
                </th>
                <th className="min-w-20  py-3 text-end text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-dashed">
                <td className=" py-3 text-sm">#00001</td>
                <td className=" py-3 text-sm">Vinland Saga</td>
                <td className=" py-3 text-sm text-end">14</td>
                <td className=" py-3 text-sm text-end">Eichiro Oda</td>
                <td className=" py-3 flex flex-row justify-end gap-x-1 text-sm text-end">
                  <div className="p-1 rounded bg-red-100">
                    <DeleteOutlineOutlined className="text-red-600" />
                  </div>
                  <div className="p-1 rounded bg-yellow-100">
                    <EditNoteOutlined className="text-yellow-600" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardBooksPage;
