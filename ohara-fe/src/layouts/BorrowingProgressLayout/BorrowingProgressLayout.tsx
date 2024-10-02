import { LoginOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useSearchBooks } from "../../context/SearchBooksContext/SearchBooksContext";
import { BookInterface } from "../../interfaces/BookInterface";
import BorrowingProgressSkeleton from "./BorrowingProgressSkeleton";
import BorrowingProgress from "./BorrowingProgress";

const BorrowingProgressLayout = () => {
  const { user } = useAuth();
  const { books, isLoading } = useSearchBooks();

  return (
    <div className="Progress min-h-40 w-full px-4 py-3 flex flex-col justify-center items-center gap-y-5 rounded-lg bg-white">
      {user ? (
        isLoading ? (
          Array.from({ length: 4 }, (_, i) => (
            <BorrowingProgressSkeleton key={i} />
          ))
        ) : (
          books &&
          books
            .slice(0, 4)
            .map((book: BookInterface) => <BorrowingProgress book={book} />)
        )
      ) : (
        <>
          <p className="font-medium text-xl text-[#94A3B8]">
            Please login to see your progress
          </p>
          <NavLink
            to="/auth/login"
            className="w-fit px-3 py-2.5 flex gap-x-2 rounded-lg font-medium bg-purple-700 text-white"
          >
            <LoginOutlined />
            <p>Login</p>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default BorrowingProgressLayout;
