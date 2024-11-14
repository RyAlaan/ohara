import { BorrowingInterface } from "@/interfaces/BorrowingInterface";
import { Link } from "react-router-dom";

const BorrowingConfirmComponent = ({borrowing}: { borrowing: BorrowingInterface }) => {
  return (
    <Link to={`/dashboard/borrowings/${borrowing.id}`} className="p-2 flex flex-row justify-between rounded-md border border-dashed">
      <div className="flex flex-col gap-y-[14px]">
        <div className="flex flex-row gap-x-2">
          <img
            src={
              borrowing.book.cover
                ? borrowing.book.cover
                : "https://placehold.com/40x57"
            }
            alt={borrowing.book.title}
            className="w-10 h-[57px] rounded"
          />
          <div className="flex flex-col gap-y-1">
            <p className="font-semibold text-xs">{borrowing.book.title}</p>
            <p className="text-xs">{borrowing.book.ISBN}</p>
          </div>
        </div>
        <div className="flex flex-row gap-x-1">
          <p className="text-sm ">
            {/* To: <span className="font-semibold">{book.author}</span> */}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button className="px-2.5 py-1 text-xs font-medium rounded bg-lightPrimary text-white">
          Confirm
        </button>
        <div className="px-2.5 py-0.5 text-sm font-medium rounded bg-yellow-100 text-yellow-500">
          Awaiting Confirmation
        </div>
      </div>
    </Link>
  );
};

export default BorrowingConfirmComponent;
