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
      <div className="w-full max-w-full overflow-auto sidebar-thin *:w-full *:px-1.5 *:md:px-4 *:py-2 *:flex *:flex-row *:items-start *:border-b *:border-dashed *:gap-x-4 *:justify-between">
        <div className=" *:text-sm *:font-semibold">
          <div className="min-w-28">Code</div>
          <div className="min-w-40">Title</div>
          <div className="min-w-28">Stock</div>
          <div className="min-w-24">Status</div>
          <div className="min-w-14 text-end">Action</div>
        </div>
        {books &&
          books.slice(0, 8).map((book: BookInterface) => (
            <div key={book.id} className="h-full *:h-full *:flex *:items-center *:text-sm">
              <div className="h-full min-w-28 flex flex-col justify-center">
                <p>#{book.id}</p>
              </div>
              <div className="min-w-40">
                <img
                  src={book.cover ? book.cover : "https://placehold.com/40x57"}
                  alt=""
                  className="w-10 h-[57px] rounded"
                />
              </div>
              <div className="min-w-28">{book.stock}</div>
              <div className="min-w-24">
                <div
                  className={clsx(
                    "w-fit max-w-full px-2.5 py-0.5 text-sm font-medium self-end",
                    { "rounded bg-red-100 text-red-500": book.stock <= 0 }, // danger
                    {
                      "rounded bg-yellow-100 text-yellow-500": book.stock < 10,
                    }, // warning
                    {
                      "rounded bg-green-100 text-green-500": book.stock >= 10,
                    } // success
                  )}
                >
                  <p>
                    {book.stock <= 0
                      ? "Empty"
                      : book.stock < 10
                      ? "Low Stock"
                      : "In Stock"}
                  </p>
                </div>
              </div>
              <div className="min-w-14 flex justify-end">
                <Link
                  to={`/dashboard/books/${book.id}`}
                  className="w-fit max-w-full px-2.5 py-0.5 text-sm font-medium self-end items-end"
                >
                  <RemoveRedEyeOutlined sx={{ fontSize: 20 }} />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AvailableVolsLayout;
