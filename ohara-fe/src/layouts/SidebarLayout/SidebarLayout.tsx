import {
  AddBoxOutlined,
  AutoStoriesOutlined,
  DashboardOutlined,
  GroupOutlined,
  HomeOutlined,
  LibraryBooksOutlined,
  Login,
  Logout,
} from "@mui/icons-material";
import SidebarBtn from "../../components/SidebarBtnComponent/SidebarBtnComponent";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useLocation } from "react-router-dom";
import { Skeleton } from "@mui/material";

const SidebarLayout = () => {
  const { user, handleLogout, isLoading } = useAuth();
  const location = useLocation();

  const renderUserSidebar = () => (
    <>
      <SidebarBtn url="/">
        <HomeOutlined />
        Home
      </SidebarBtn>
      <SidebarBtn url="/borrowings">
        <AutoStoriesOutlined />
        Borrowings
      </SidebarBtn>
    </>
  );

  const renderDashboardSidebar = () => (
    <>
      <SidebarBtn url="/">
        <HomeOutlined />
        Home
      </SidebarBtn>
      <SidebarBtn url="/dashboard/">
        <DashboardOutlined />
        Dashboard
      </SidebarBtn>
      <SidebarBtn url="/dashboard/books">
        <LibraryBooksOutlined />
        Books
      </SidebarBtn>
      <SidebarBtn url="/dashboard/users">
        <GroupOutlined />
        Users
      </SidebarBtn>
      <SidebarBtn url="/dashboard/borrowings">
        <AddBoxOutlined />
        Borrowings
      </SidebarBtn>
    </>
  );

  const renderAdminSidebar = () => (
    <>
      <SidebarBtn url="/dashboard/">
        <DashboardOutlined />
        Dashboard
      </SidebarBtn>
      <SidebarBtn url="/">
        <HomeOutlined />
        Home
      </SidebarBtn>
      <SidebarBtn url="/borrowings">
        <AutoStoriesOutlined />
        Borrowings
      </SidebarBtn>
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
    <div className="sidebar sticky top-0 h-screen w-fit px-6 pt-5 pb-10 hidden lg:flex flex-col justify-between bg-white">
      <div className="header flex flex-col gap-y-10">
        <div className="logo">
          <h1 className="text-3xl font-bold text-center">
            <span className="text-purple-700">RY</span>OHARA
          </h1>
        </div>
        <div className="content flex flex-col gap-y-2.5">
          {renderSidebarContent()}
        </div>
      </div>
      <div className="bottom">
        {isLoading ? (
          <Skeleton variant="rounded" width={"100%"} height={40} />
        ) : (
          <SidebarBtn
            url={user ? "/auth/logout" : "/auth/login"}
            onClick={user ? handleLogout : undefined}
          >
            {user ? <Logout /> : <Login />}
            {user ? "Logout" : "Login"}
          </SidebarBtn>
        )}
      </div>
    </div>
  );
};

export default SidebarLayout;
