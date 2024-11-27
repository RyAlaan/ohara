import { useGetData } from "@/hooks/apiService";
import { BorrowingInterface } from "@/interfaces/BorrowingInterface";
import { useState } from "react";
import { useParams } from "react-router-dom";

const BorrowingPage = () => {
  const [borrowing, setBorrowing] = useState<BorrowingInterface | null>(null);
  const [message, setMessage] = useState<{
    message: string | null;
    status: "success" | "error" | null;
  }>({ message: null, status: "success" });

  const { id } = useParams();

  const fetchBorrowing = async () => {
    const result = await useGetData(`/borrowings/${id}`);
    if (result.status) {
      setBorrowing(result.data);
      setMessage({ message: result.message, status: "success" });
    } else {
      setMessage({ message: result.message, status: "error" });
    }
  };

  return <div>'BorrowingPage'</div>;
};

export default BorrowingPage;
