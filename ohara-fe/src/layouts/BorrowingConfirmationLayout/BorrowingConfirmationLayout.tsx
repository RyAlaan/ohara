import { Link, useSearchParams } from "react-router-dom";
import { BookInterface } from "@/interfaces/BookInterface";
import BorrowingConfirmComponent from "@/components/BorrowingConfirmComponent/BorrowingConfirmComponent";
import { BorrowingInterface } from "@/interfaces/BorrowingInterface";
import {
  DashboardBorrowings,
  DashboardInterface,
} from "@/interfaces/DashboardInterface";

const BorrowingConfirmationLayout = ({
  data,
}: {
  data: BorrowingInterface[];
}) => {
  return (
    <div className="w-full md:w-4/12 min-h-96 p-4 flex flex-col gap-y-5 bg-white rounded-md">
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
        {data.slice(0, 4).map((borrowing: BorrowingInterface) => (
          <BorrowingConfirmComponent key={borrowing.id} borrowing={borrowing} />
        ))}
      </div>
    </div>
  );
};

export default BorrowingConfirmationLayout;
