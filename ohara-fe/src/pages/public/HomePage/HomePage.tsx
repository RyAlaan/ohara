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
    <div className="main-content w-full flex flex-col p-5 gap-y-5">
      <CategoriesLayout categories={categories} />
      <BooksLayout />
      <BorrowingProgressLayout />
    </div>
  );
};

export default HomePage;
