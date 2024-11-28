import { LibraryBooks } from "@mui/icons-material";
import ProgressBarComponent from "../../components/ProgressComponent/ProgressComponent";
import { DashboardBorrowings } from "@/interfaces/DashboardInterface";
import { clsx } from "clsx";

const BorrowingTargetLayout = ({ data }: { data: DashboardBorrowings }) => {
  return (
    <div className="new-users col-span-12 xl:col-span-4 p-5 flex flex-col gap-y-4 md:gap-y-10 xl:gap-y-14 rounded-xl bg-white">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-medium">Borrowings</p>
        <div
          className={clsx(
            "px-1.5 py-0.5 rounded text-xs",
            data.borrowingPercentage > -1
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          )}
        >
          {data.borrowingPercentage > 0
            ? "+ " + data.borrowingPercentage
            : data.borrowingPercentage}
          %
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <LibraryBooks sx={{ fontSize: 36 }} />
        <p className="font-bold text-3xl">130</p>
      </div>
      <div className="w-full flex flex-col items-end justify-end">
        <ProgressBarComponent value={data.borrowingTarget} />
      </div>
    </div>
  );
};

export default BorrowingTargetLayout;
