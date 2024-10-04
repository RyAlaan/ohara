import { createContext, useContext, useEffect, useState } from "react";
import { BookInterface } from "../../interfaces/BookInterface";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

interface SearchBooksContextType {
  isLoading: boolean;
  books: BookInterface[] | null;
  handleSearchBooks: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBooksContext = createContext<SearchBooksContextType | undefined>(
  undefined
);

export const useSearchBooks = () => {
  const context = useContext(SearchBooksContext);

  if (!context) {
    console.error("context not found");
    throw new Error(
      "useSearchBooks must be used within an SearchBooksProvider"
    );
  }

  return context;
};

export const SearchBooksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookInterface[] | null>([]);
  const [queryParam, _] = useSearchParams();
  const navigation = useNavigate();

  const fetchBooks = async () => {
    setIsLoading(true);
    const { data } = await axios.get<any>("http://localhost:8000/api/books", {
      params: {
        q: queryParam.get("q"),
        perpage: 12,
      },
    });

    setBooks(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [queryParam.get("q")]);

  // navigate to "/" ? q=query
  const handleSearchBooks = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.q.value;
    navigation(`/?q=${query}`);
    fetchBooks();
  };

  const contextValue = {
    isLoading,
    books,
    handleSearchBooks,
  };

  return (
    <SearchBooksContext.Provider value={contextValue}>
      {children}
    </SearchBooksContext.Provider>
  );
};
