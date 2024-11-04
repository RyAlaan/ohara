import { clsx } from "clsx";
import { NavLink, To } from "react-router-dom";

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
          "py-2 px-6 w-full inline-block rounded-lg text-sm md:text-base font-medium transition-all duration-500",
          isActive
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-white hover:bg-purple-100"
        )
      }
    >
      <p className="w-max">{text}</p>
    </NavLink>
  );
};

export default CategoryBtn;
