import { useGetData, usePostData } from "@/hooks/apiService";
import { BookInterface } from "@/interfaces/BookInterface";
import { CategoryInterface } from "@/interfaces/CategoryInterface";
import { BookmarkBorderRounded } from "@mui/icons-material";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";

const BookPage = () => {
  const [book, setBook] = useState<BookInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [message, setMessage] = useState<{
    message: string | null;
    status: "success" | "error" | null;
  }>({ message: null, status: "success" });

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);

      const result = await useGetData(`/books/${id}`);
      if (result.status) {
        setMessage({ message: result.message, status: "success" });
        setBook(result.data);
      } else {
        setMessage({ message: result.message, status: "error" });
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  const handleBorrowing = async (id: string | undefined) => {
    const result = await usePostData(`/borrowings/${id}`, {})
    console.log(result);
    
    if (result.status) {
      window.location.href = `/borrowings/${result.data.id}`
    } else {
      setMessage({message : result.message, status : "success"});
    }
  };

  return (
    <div className="min-h-screen w-full p-5 overflow-hidden">
      <div className="w-full p-5 flex flex-col md:flex-row gap-x-14 bg-white rounded-lg">
        <div className="flex flex-col items-center gap-y-10">
          <img
            src={`${book?.cover}`}
            alt={`${book?.title}`}
            style={{
              width: 210,
            }}
            className="rounded-lg"
          />
          <div className="w-full flex flex-row justify-between items-center">
            <BookmarkBorderRounded className="!text-3xl text-yellow-600" />
            {book && (
              <button
                disabled={book.stock <= 0}
                onClick={() => handleBorrowing(book?.id)}
                className={clsx(
                  "w-fit px-6 py-2 rounded-full font-medium",
                  book.stock <= 0
                    ? "text-white bg-slate-500"
                    : "text-white bg-lightPrimary"
                )}
              >
                Read now
              </button>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-14">
          <div className="flex flex-col gap-y-6">
            <h1 className="text-4xl font-bold">{book?.title}</h1>
            <div className="flex flex-row items-center gap-x-3">
              {book?.categories?.map((category: CategoryInterface) => (
                <div className="w-fit px-3 py-1 text-xs text-white font-medium bg-lightPrimary rounded-l-full rounded-b-full">
                  {category.name}
                </div>
              ))}
            </div>
            <p className="text-justify">{book?.synopsis}</p>
          </div>
          <div className="flex flex-row items-center gap-x-5">
            <div
              className={clsx(
                "w-fit min-w-12 px-2.5 py-0.5 text-sm text-center font-medium self-end rounded-lg",
                {
                  "rounded bg-red-100 text-red-500":
                    book?.stock && book.stock <= 0,
                }, // danger
                {
                  "rounded bg-yellow-100 text-yellow-500":
                    book?.stock && book.stock < 10,
                }, // warning
                {
                  "rounded bg-green-100 text-green-500":
                    book?.stock && book.stock >= 10,
                } // success
              )}
            >
              {book?.stock}
            </div>
            <p className="font-medium">
              {book && book.authors?.map((item) => item.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
