import { useAuth } from "../../context/AuthContext/AuthContext";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import UserComponent from "../../components/UserComponent/UserComponent";
import ToggleDarkModeComponent from "../../components/ToggleDarkModeComponent/ToggleDarkModeComponent";
import UserSkeleton from "../../components/UserComponent/UserSkeleton";

const NavbarLayout = () => {
  const { user } = useAuth();

  return (
    //  md:min-h-20 w-full px-1.5 sm:px-5 py-2.5 sm:py-5
    <div className="navbar sticky top-0 z-[100] px-5 py-2 md:py-5 flex justify-between items-center bg-white">
      <SearchComponent />
      <div className="tools md:flex items-center gap-x-10">
        <ToggleDarkModeComponent />
        {user ? <UserComponent /> : <UserSkeleton />}
      </div>
    </div>
  );
};

export default NavbarLayout;
