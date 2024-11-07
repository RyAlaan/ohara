import { useGetData } from "@/hooks/apiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookPage = () => {
  const [book, setBook] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchBookData() {
      const result = await useGetData(`/books/${id}`);
      setBook(result.data);
    }
  }, []);

  return <div>BookPage</div>;
};

export default BookPage;
