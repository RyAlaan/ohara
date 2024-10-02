import { useAuth } from "../../context/AuthContext/AuthContext";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import UserComponent from "../../components/UserComponent/UserComponent";
import ToggleDarkModeComponent from "../../components/ToggleDarkModeComponent/ToggleDarkModeComponent";
import UserSkeleton from "../../components/UserComponent/UserSkeleton";

const NavbarLayout = () => {
  const { user } = useAuth();

  return (
    <div className="navbar sticky top-0 z-[100] min-h-20 w-full px-5 flex justify-between items-center bg-white">
      <SearchComponent />
      <div className="tools hidden md:flex items-center gap-x-10">
        <ToggleDarkModeComponent />
        {user ? <UserComponent /> : <UserSkeleton />}
      </div>
    </div>
  );
};

export default NavbarLayout;
