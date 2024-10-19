import { createContext, useContext, useEffect, useState } from "react";
import { BookInterface } from "@/interfaces/BookInterface";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getData } from "@/hooks/apiService";

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
    try {
      const result = await getData("/books", {
        title: queryParam.get("title"),
        perpage: 12,
      });
      setBooks(result.data);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [queryParam.get("title")]);

  
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
