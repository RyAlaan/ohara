import { BorrowingInterface } from "@/interfaces/BorrowingInterface";
import { Link } from "react-router-dom";

const BorrowingConfirmComponent = ({
  borrowing,
}: {
  borrowing: BorrowingInterface;
}) => {
  return (
    <div className="p-2 flex flex-col gap-y-3 rounded-md border border-dashed">
      <div className="w-full flex flex-row items-center justify-between">
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
        </div>
        <div className="flex flex-col items-end justify-between">
          <Link
            to={`/dashboard/borrowings/${borrowing.id}`}
            className="px-2.5 py-1 text-xs font-medium rounded bg-lightPrimary text-white"
          >
            check
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-sm">
          To: <span className="font-semibold">{borrowing.user.name}</span>
        </p>
        <div className="w-fit px-1 py-0.5 rounded bg-yellow-100 text-yellow-500 font-semibold text-xs">
          <p>Awaiting Confirmation</p>
        </div>
      </div>
    </div>
  );
};

export default BorrowingConfirmComponent;
