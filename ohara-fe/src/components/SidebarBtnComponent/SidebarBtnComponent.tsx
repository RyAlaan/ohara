import { clsx } from "clsx";
import { ReactNode } from "react";
import { Link, NavLink, To, useLocation } from "react-router-dom";

interface SidebarBtnProps {
  children: ReactNode;
  url: string;
  onClick?: () => void;
}

const SidebarBtn = ({ children, onClick, url }: SidebarBtnProps) => {
  const location = useLocation();

  return (
    <NavLink
      to={url}
      onClick={onClick}
      className={clsx(
        { "text-white bg-purple-700": url === "/auth/login" },
        "button w-60 px-4 py-2.5 rounded-md flex flex-row gap-x-4 transition-all duration-300 cursor-pointer group",
        location.pathname.includes(url) && url !== "/" && url !== "/dashboard/"
          ? "text-purple-700 bg-purple-100"
          : url === "/dashboard/" && location.pathname === "/dashboard/"
          ? "text-purple-700 bg-purple-100"
          : url === "/" && location.pathname === url
          ? "text-purple-700 bg-purple-100"
          : "text-slate-400 hover:bg-purple-100 hover:text-black"
      )}
    >
      {children}
    </NavLink>
  );
};

export default SidebarBtn;
