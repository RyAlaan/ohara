import { BookInterface } from "../../interfaces/BookInterface";

const BorrowingConfirmComponent = ({book}: { book: BookInterface }) => {
  return (
    <div className="p-2 flex flex-row justify-between rounded-md border border-dashed">
      <div className="flex flex-col gap-y-[14px]">
        <div className="flex flex-row gap-x-2">
          <img
            src={
              book.cover
                ? book.cover
                : "https://placehold.com/40x57"
            }
            alt={book.title}
            className="w-10 h-[57px] rounded"
          />
          <div className="flex flex-col gap-y-1">
            <p className="font-bold text-xs">{book.title}</p>
            {/* <p className="text-xs">volume {book.volume}</p> */}
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
        <div className="px-2.5 py-0.5 rounded font-semibold text-[#FDE047] text-xs bg-yellow-600">
          Awaiting Confirmation
        </div>
      </div>
    </div>
  );
};

export default BorrowingConfirmComponent;
