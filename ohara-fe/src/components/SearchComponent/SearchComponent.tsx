import { SearchOutlined } from "@mui/icons-material";
import { useSearchBooks } from "@/context/SearchBooksContext/SearchBooksContext";

const SearchComponent = () => {
  const { handleSearchBooks } = useSearchBooks();

  return (
    <form
      onSubmit={handleSearchBooks}
      className="search w-full md:w-fit px-2.5 py-3 flex flex-row justify-between md:justify-normal gap-x-4 rounded-lg bg-purple-50"
    >
      <input
        type="text"
        name="q"
        placeholder="What book are you looking for?"
        className="text-sm text-black placeholder:text-[#94A3B8] bg-transparent"
      />
      <button type="submit">
        <SearchOutlined className="text-purple-700" />
      </button>
    </form>
  );
};

export default SearchComponent;
