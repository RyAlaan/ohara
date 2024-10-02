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
    <div className="Categories w-fit flex flex-row gap-x-7">
      {categories.map(({ text, to, className }) => {
        return (
          <CategoryBtn key={text} text={text} to={to} className={className} />
        );
      })}
    </div>
  );
};

export default CategoriesLayout;
