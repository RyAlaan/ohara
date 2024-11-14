import { Link, useSearchParams } from "react-router-dom";
import { BookInterface } from "@/interfaces/BookInterface";
import BorrowingConfirmComponent from "@/components/BorrowingConfirmComponent/BorrowingConfirmComponent";
import { useEffect, useState } from "react";
import { PaginationInterface } from "@/interfaces/PaginationInterface";
import { BorrowingInterface } from "@/interfaces/BorrowingInterface";
import { useGetData } from "@/hooks/apiService";

const BorrowingConfirmationLayout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [borrowings, setBorrowings] = useState<BorrowingInterface[] | null>(
      null
    );
    const [searchParam, setSearchParam] = useSearchParams();
    const [message, setMessage] = useState<{
      message: string | null;
      status: "success" | "error" | null;
    }>({ message: null, status: "success" });
    const [pagination, setPagination] = useState<PaginationInterface | null>(
      null
    );

    const setPage = (page: string) => {
      setSearchParam({ ...searchParam, page: page });
    };

    useEffect(() => {
      async function fetchBorrowing() {
        setLoading(true);
        const param = {
          perPage: searchParam.get("perPage"),
          page: searchParam.get("page"),
          status: searchParam.get("status"),
          categories: searchParam.get("categories"),
          email: searchParam.get("email"),
          title: searchParam.get("title"),
          isbn: searchParam.get("isbn"),
        };

        const result = await useGetData("/borrowings", param);
        if (result.status) {
          setMessage({ message: result.message, status: "success" });
          console.log(result.data);

          setPagination(result.pagination);
          setBorrowings(result.data);
        } else {
          setMessage({ message: result.message, status: "error" });
        }
        setLoading(false);
      }

      fetchBorrowing();
    }, []);

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
        {borrowings &&
          borrowings
            .slice(0, 4)
            .map((borrowing: BorrowingInterface) => (
              <BorrowingConfirmComponent key={borrowing.id} borrowing={borrowing} />
            ))}
      </div>
    </div>
  );
};

export default BorrowingConfirmationLayout;
