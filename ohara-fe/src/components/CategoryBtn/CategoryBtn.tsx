import clsx from "clsx";
import { NavLink, To, useLocation } from "react-router-dom";

interface CategoryBtnInterface {
  text: string;
  to: To;
  className?: string;
}

const CategoryBtn = ({ text, to, className }: CategoryBtnInterface) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: Boolean }) =>
        clsx(
          className,
          "py-2 px-6 rounded-lg text-base font-medium transition-all duration-500",
          isActive
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-white hover:bg-purple-100"
        )
      }
    >
      <p>{text}</p>
    </NavLink>
  );
};

export default CategoryBtn;
