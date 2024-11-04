import { To } from "react-router-dom";
import CategoriesLayout from "../../../layouts/CategoriesLayout/CategoriesLayout";
import BorrowingProgressLayout from "../../../layouts/BorrowingProgressLayout/BorrowingProgressLayout";
import BooksLayout from "../../../layouts/BooksLayout/BooksLayout";

interface CategoryBtnInterface {
  to: To;
  text: string;
  className?: string;
}

const HomePage = () => {
  const categories: CategoryBtnInterface[] = [
    {
      text: "Recommendations",
      to: "/",
    },
    {
      text: "New Release",
      to: "/new-release",
    },
    {
      text: "Trending",
      to: "/trending",
    },
  ];

  return (
    <main className="main-content w-full flex flex-col p-3 md:p-5 gap-y-3 md:gap-y-5 overflow-x-hidden">
      <CategoriesLayout categories={categories} />
      <BooksLayout />
      <BorrowingProgressLayout />
    </main>
  );
};

export default HomePage;
