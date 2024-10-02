import { Group } from "@mui/icons-material";
import { Link } from "react-router-dom";

const UsersCardLayout = () => {
  return (
    <div className="new-users h-52 min-w-72 col-span-12 md:col-span-6 xl:col-span-4 p-5 flex flex-col justify-between gap-y-8 rounded-xl bg-white">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-medium">New Users</p>
        <div className="px-1.5 py-0.5 rounded bg-green-100 text-green-500 text-xs">
          + 2.2%
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <Group sx={{ fontSize: 36 }} />
        <p className="font-bold text-3xl">500K</p>
      </div>
      <Link to={"/dashboard/users"}>View more...</Link>
    </div>
  );
};

export default UsersCardLayout;
