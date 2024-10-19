import { BookInterface } from "@/interfaces/BookInterface";

const BookComponent = ({ book }: { book: BookInterface }) => {
  return (
    <div key={book.id} className="book">
      <img
        className="rounded"
        src={
          book.cover
            ? book.cover
            : "https://placehold.co/120x170"
        }
        alt={book.title}
        width={120}
      />
      <p className="text-sm font-semibold pt-1">{book.title}</p>
      {/* <p className="text-xs text-[#94A3B8]">{book.author}</p> */}
    </div>
  );
};

export default BookComponent;
