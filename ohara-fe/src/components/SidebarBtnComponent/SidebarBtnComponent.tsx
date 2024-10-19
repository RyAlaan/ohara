import { clsx } from "clsx";
import { ReactNode } from "react";
import { Link, To, useLocation } from "react-router-dom";

interface SidebarBtnProps {
  children: ReactNode;
  url: To;
  onClick?: () => void;
}

const SidebarBtn = ({ children, onClick, url }: SidebarBtnProps) => {
  const location = useLocation();

  return (
    <Link
      to={url}
      onClick={onClick}
      className={clsx(
        { "text-white bg-purple-700": url === "/auth/login" },
        "button w-60 px-4 py-2.5 rounded-md flex flex-row gap-x-4 transition-all duration-300 cursor-pointer group",
        url === location.pathname
          ? "text-purple-700 bg-purple-100"
          : "text-slate-400 hover:bg-purple-100 hover:text-black"
      )}
    >
      {/* 
        ({ isActive }) =>
        
      */}
      {children}
    </Link>
  );
};

export default SidebarBtn;
