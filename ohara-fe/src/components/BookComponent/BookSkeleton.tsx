import { Skeleton } from "@mui/material";

const BookSkeleton = () => {
  return (
    <div className="book">
      <Skeleton variant="rounded" width={"100%"} height={170} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} width={"100%"} />
      <Skeleton variant="text" sx={{ fontSize: "0.75rem" }} width={"100%"} />
    </div>
  );
};

export default BookSkeleton;
