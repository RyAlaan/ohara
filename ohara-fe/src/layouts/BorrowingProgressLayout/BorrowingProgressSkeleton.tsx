import { Skeleton } from "@mui/material";

const BorrowingProgressSkeleton = () => {
  return (
    <div className="ProgressLists w-full flex flex-row justify-between items-center gap-x-5">
      <Skeleton animation="wave" variant="rounded" width={40} height={57} />
      <Skeleton
        animation="wave"
        variant="text"
        width={224}
        sx={{ fontSize: "0.75rem" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        width={40}
        sx={{ fontSize: "0.75rem" }}
      />
      <Skeleton animation="wave" variant="rounded" width={"60%"} height={6} />
      <Skeleton
        animation="wave"
        variant="text"
        width={160}
        sx={{ fontSize: "0.875rem" }}
      />
    </div>
  );
};

export default BorrowingProgressSkeleton;
