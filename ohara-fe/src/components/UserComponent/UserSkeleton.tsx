import { Skeleton } from "@mui/material";

const UserSkeleton = () => {
  return (
    <div className="profile w-44 px-2.5 py-5 flex flex-row justify-end gap-x-[14px]">
      <div className="userData min-w-20 flex flex-col items-end">
        <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} width={"70%"} />
        <Skeleton variant="text" sx={{ fontSize: "0.75rem" }} width={"100%"} />
      </div>
      <Skeleton height={40} width={40} variant="circular"></Skeleton>
    </div>
  );
};

export default UserSkeleton;
