import { useAuth } from "@/context/AuthContext/AuthContext";
import {
  AddBoxOutlined,
  AutoStoriesOutlined,
  BookmarksOutlined,
  DashboardOutlined,
  GroupOutlined,
  HomeOutlined,
  LibraryBooksOutlined,
  Login,
  Logout,
  WidgetsOutlined,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const { user, handleLogout, isLoading } = useAuth();
  const location = useLocation();

  const renderUserSidebar = () => (
    <>
      <Link to="/">
        <HomeOutlined sx={{ fontSize: 24 }} />
        <p>Home</p>
      </Link>
      <Link to="/bookmarks">
        <BookmarksOutlined sx={{ fontSize: 20 }} />
        <p>Bookmark</p>
      </Link>
      <Link to="/borrowings">
        <AutoStoriesOutlined sx={{ fontSize: 24 }} />
        <p>Borrowings</p>
      </Link>
    </>
  );

  const renderDashboardSidebar = () => (
    <>
      <Link to="/">
        <HomeOutlined sx={{ fontSize: 24 }} />
        Home
      </Link>
      <Link to="/dashboard/">
        <DashboardOutlined sx={{ fontSize: 24 }} />
        Dashboard
      </Link>
      <Link to="/dashboard/books/">
        <LibraryBooksOutlined sx={{ fontSize: 24 }} />
        Books
      </Link>
      <Link to="/dashboard/users/">
        <GroupOutlined sx={{ fontSize: 24 }} />
        Users
      </Link>
      <Link to="/dashboard/borrowings/">
        <AddBoxOutlined sx={{ fontSize: 24 }} />
        Borrowings
      </Link>
    </>
  );

  const renderAdminSidebar = () => (
    <>
      <Link to="/dashboard/">
        <DashboardOutlined sx={{ fontSize: 24 }} />
        Dashboard
      </Link>
      <Link to="/">
        <HomeOutlined sx={{ fontSize: 24 }} />
        Home
      </Link>
      <Link to="/bookmarks">
        <BookmarksOutlined sx={{ fontSize: 24 }} />
        Bookmark
      </Link>
      <Link to="/borrowings">
        <AutoStoriesOutlined sx={{ fontSize: 24 }} />
        Borrowings
      </Link>
    </>
  );

  const renderSidebarContent = () => {
    if (user?.role === "admin") {
      return location.pathname.includes("dashboard")
        ? renderDashboardSidebar()
        : renderAdminSidebar();
    } else {
      return renderUserSidebar();
    }
  };

  return (
    <div className="lg:hidden navbar sticky bottom-0 z-[100] w-full gap-x-4 sm:gap-x-16 md:gap-x-24 px-1 py-2.5 flex justify-evenly items-center bg-white overflow-x-hidden *:flex *:flex-col *:items-center *:text-xs">
      {renderSidebarContent()}
    </div>
  );
};

export default BottomNavbar;
