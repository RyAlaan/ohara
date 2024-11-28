import { DashboardUsers } from "@/interfaces/DashboardInterface";
import { Group } from "@mui/icons-material";
import { clsx } from "clsx";
import { Link } from "react-router-dom";

const UsersCardLayout = ({ data }: { data: DashboardUsers }) => {
  return (
    <div className="new-users col-span-12 md:col-span-6 xl:col-span-4 p-5 flex flex-col gap-y-4 md:gap-y-8 xl:gap-y-14 rounded-xl bg-white">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-medium">New Users</p>
        <div
          className={clsx(
            "px-1.5 py-0.5 rounded text-xs",
            data.usersPercentage > -1
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          )}
        >
          {data.usersPercentage > 0
            ? "+ " + data.usersPercentage
            : data.usersPercentage}
          %
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <Group sx={{ fontSize: 36 }} />
        <p className="font-bold text-3xl">{data.totalUsers}</p>
      </div>
      <Link to={"/dashboard/users"}>View more...</Link>
    </div>
  );
};

export default UsersCardLayout;
