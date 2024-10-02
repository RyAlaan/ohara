import { LibraryBooks } from "@mui/icons-material";
import ProgressBarComponent from "../../../components/ProgressComponent/ProgressComponent";

const BorrowingTargetLayout = ({ percentage }: { percentage: number }) => {
  return (
    <div className="new-users h-52 min-w-72 col-span-12 md:col-span-6 xl:col-span-4 p-5 flex flex-col justify-between gap-y-8 rounded-xl bg-white">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-medium">Borrowings</p>
        <div className="px-1.5 py-0.5 rounded bg-red-100 text-red-500 text-xs">
          - 2.2%
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <LibraryBooks sx={{ fontSize: 36 }} />
        <p className="font-bold text-3xl">130</p>
      </div>
      <div className="w-full flex flex-col items-end justify-end">
        <ProgressBarComponent value={percentage} />
      </div>
    </div>
  );
};

export default BorrowingTargetLayout;
