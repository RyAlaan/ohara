import { Link } from "react-router-dom";
import { BookInterface } from "@/interfaces/BookInterface";
import BorrowingConfirmComponent from "@/components/BorrowingConfirmComponent/BorrowingConfirmComponent";

const BorrowingConfirmationLayout = ({
  books,
}: {
  books: BookInterface[] | null;
}) => {
  return (
    <div className="w-full md:w-5/12 min-h-96 p-4 flex flex-col gap-y-5 bg-white rounded-md">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="w-28 font-semibold">Borrowing Confirmation</p>
        <Link
          className="h-fit px-2.5 py-2 rounded font-medium bg-purple-100"
          to={"/dashboard/borrowings?status=awaiting confirmation"}
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col gap-y-2">
        {books &&
          books
            .slice(0, 4)
            .map((book: BookInterface) => (
              <BorrowingConfirmComponent key={book.id} book={book} />
            ))}
      </div>
    </div>
  );
};

export default BorrowingConfirmationLayout;
