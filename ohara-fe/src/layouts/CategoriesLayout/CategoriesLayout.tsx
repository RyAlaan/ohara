import { To } from "react-router-dom";
import CategoryBtn from "../../components/CategoryBtn/CategoryBtn";

interface CategoryBtnInterface {
  to: To;
  text: string;
  className?: string;
}

const CategoriesLayout = ({
  categories,
}: {
  categories: CategoryBtnInterface[];
}) => {
  return (
    <div className="Categories w-full md:w-fit max-w-full scroll-m-7 flex flex-row overflow-x-auto whitespace-nowrap gap-x-3 md:gap-x-7 scrollbar-thin">
      {categories.map(({ text, to, className }) => (
        <CategoryBtn key={text} text={text} to={to} className={className} />
      ))}
    </div>
  );
};

export default CategoriesLayout;
