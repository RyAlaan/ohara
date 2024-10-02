import BookComponent from "../../components/BookComponent/BookComponent";
import BookSkeleton from "../../components/BookComponent/BookSkeleton";
import { useSearchBooks } from "../../context/SearchBooksContext/SearchBooksContext";
import { BookInterface } from "../../interfaces/BookInterface";

const BooksLayout = () => {
  const { books, isLoading } = useSearchBooks();

  return (
    <div className="Lists min-h-80 p-5 grid grid-cols-6 gap-10 rounded-lg bg-white">
      {isLoading
        ? Array.from({ length: 12 }, (_, i) => (
            <div key={i}>
              <BookSkeleton />
            </div>
          ))
        : books &&
          books.map((book: BookInterface) => (
            <div key={book.id}>
              <BookComponent book={book} />
            </div>
          ))}
    </div>
  );
};

export default BooksLayout;
