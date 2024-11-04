import { BookInterface } from "@/interfaces/BookInterface";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

interface AvailableVolsLayoutInterface {
  books: BookInterface[] | null;
}

const AvailableVolsLayout = ({ books }: AvailableVolsLayoutInterface) => {
  return (
    <div className="w-full md:w-7/12 min-h-96 max-w-full p-6 bg-white rounded-md">
      <table className="w-full max-w-full overflow-auto">
        <thead className="border-b border-dashed">
          <tr>
            <th className="w-80 py-3 text-start text-sm font-semibold">Code</th>
            <th className="w-80 py-3 text-start text-sm font-semibold">
              Title
            </th>
            <th className="w-28 py-3 text-end text-sm font-semibold">Stock</th>
            <th className="w-full max-w-full py-3 text-end text-sm font-semibold">Status</th>
            <th className="w-28 py-3 text-end text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book: BookInterface) => (
              <tr className="border-b border-dashed">
                <td>
                  <Link
                    to={`/dashboard/books/${book.id}`}
                    className="py-3 text-sm"
                  >
                    #{book.id}
                  </Link>
                </td>
                <td className="py-3 text-sm">{book.title}</td>
                <td className="py-3 text-sm text-end">4</td>
                <td className="py-3 text-sm text-end flex flex-col items-end">
                  <div
                    className={clsx(
                      "w-fit max-w-full px-2.5 py-0.5 text-sm font-medium self-end",
                      { "rounded bg-red-100 text-red-500": book.stock <= 0 }, // danger
                      {
                        "rounded bg-yellow-100 text-yellow-500":
                          book.stock < 10,
                      }, // warning
                      {
                        "rounded bg-green-100 text-green-500": book.stock >= 10,
                      } // success
                    )}
                  >
                    {book.stock <= 0
                      ? "Empty"
                      : book.stock < 10
                      ? "Low Stock"
                      : "In Stock"}
                  </div>
                </td>
                <td className="py-3 text-sm text-end">
                  <Link
                    to={`/dashboard/books/${book.id}`}
                    className="p-1 rounded bg-blue-100"
                  >
                    <RemoveRedEyeOutlined className="text-blue-600" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableVolsLayout;
