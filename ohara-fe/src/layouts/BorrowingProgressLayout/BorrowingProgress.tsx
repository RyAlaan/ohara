import { BookInterface } from "../../interfaces/BookInterface";

const BorrowingProgress = ({ book }: { book: BookInterface }) => {
  return (
    <div className="ProgressLists w-full flex flex-row justify-between items-center gap-x-5">
      <img
        src={book.cover}
        alt={"book name"}
        className="w-10 h-[57px] rounded"
      />
      <p className="w-56 text-xs font-medium">{book.title}</p>
      <div className="w-3/5 h-1.5 rounded-full bg-[#94A3B8] overflow-hidden">
        <div className="h-full w-2/5 rounded-full bg-slate-700"></div>
      </div>
      <p className="w-40 text-sm text-[#94A3B8]">40% complete</p>
    </div>
  );
};

export default BorrowingProgress;
