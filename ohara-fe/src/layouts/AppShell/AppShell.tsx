import { Outlet, useLocation } from "react-router-dom";
import NavbarLayout from "../NavbarLayout/NavbarLayout";
import SidebarLayout from "../SidebarLayout/SidebarLayout";
import { SearchBooksProvider } from "@/context/SearchBooksContext/SearchBooksContext";
import BottomNavbar from "../BottomNavbar/BottomNavbar";


const disableSidebar = ["/404", "/auth/login", "/auth/register"];
const disableNavbar = ["/404", "/auth/login", "/auth/register"];

const AppShell = () => {
  const location = useLocation();

  return (
    <SearchBooksProvider>
      <main className="page font-poppins min-h-screen flex bg-purple-50">
        {!disableSidebar.includes(location.pathname) && <SidebarLayout />}
        <div className="content w-full">
          {!disableNavbar.includes(location.pathname) && <NavbarLayout />}
          <div>
            <Outlet />
          </div>
          {!disableNavbar.includes(location.pathname) && <BottomNavbar />}
        </div>
      </main>
    </SearchBooksProvider>
  );
};

export default AppShell;
