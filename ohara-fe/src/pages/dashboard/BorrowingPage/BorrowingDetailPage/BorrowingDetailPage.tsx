import { useAuth } from "@/context/AuthContext/AuthContext";
import { useGetData } from "@/hooks/apiService";
import { BorrowingInterface } from "@/interfaces/BorrowingInterface";
import {
  AccountCircleRounded,
  AlternateEmailRounded,
  AutoStoriesOutlined,
  CalendarMonthRounded,
  HourglassBottomRounded,
  HouseRounded,
  LabelRounded,
  PaidRounded,
  PhoneRounded,
} from "@mui/icons-material";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BorrowingDetailPage = () => {
  const [borrowing, setBorrowing] = useState<BorrowingInterface | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBorrowing() {
      const result = await useGetData(`/borrowings/${id}`);
      setBorrowing(result.data);
    }
    fetchBorrowing();
  }, [id]);

  const synopsis = borrowing?.book?.synopsis || "";

  const previewText = synopsis.substring(0, 150) + "...";

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  if (!borrowing) return <p>Loading...</p>;

  return (
    <div className="p-5 lg:px-6 flex flex-col gap-y-4">
      <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
        <div className="w-full p-8 flex flex-col gap-y-8 border rounded-md bg-white">
          <p className="font-medium text-lg">Order Details</p>
          <div className="w-full flex flex-col text-xs font-medium *:border-b-2 *:border-slate-100 last:!border-b-0">
            <DetailRow
              label="ID"
              value={borrowing.id}
              icon={<AutoStoriesOutlined />}
            />
            <DetailRow
              label="Status"
              value={borrowing.status}
              icon={<LabelRounded />}
              customClass={getStatusClass(borrowing.status)}
            />

            {borrowing.status === "awaiting confirmation" ? (
              <>
                <DateRow
                  label="Date Expired"
                  value={borrowing.exp_date}
                  icon={<HourglassBottomRounded />}
                />
                <DateRow
                  label="Start Date"
                  value={borrowing.start_date}
                  icon={<CalendarMonthRounded />}
                />
              </>
            ) : borrowing.status === "borrowed" ? (
              <>
                <DateRow
                  label="Start Date"
                  value={borrowing.start_date}
                  icon={<CalendarMonthRounded />}
                />
                <DateRow
                  label="End Date"
                  value={borrowing.end_date}
                  icon={<CalendarMonthRounded />}
                />
              </>
            ) : (
              <>
                <DateRow
                  label="End Date"
                  value={borrowing.end_date}
                  icon={<CalendarMonthRounded />}
                />
                <DetailRow
                  label="Fine"
                  value={new Intl.NumberFormat("id-ID").format(borrowing.fine)}
                  icon={<PaidRounded />}
                />
              </>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-14 border rounded-md bg-white">
          <div className="px-5 py-8 flex flex-col gap-8">
            <p className="font-medium text-lg">User Details</p>
            <div className="w-full flex flex-col text-xs font-medium *:border-b-2 *:border-slate-100 last:!border-b-0">
              <DetailRow
                label="Name"
                value={borrowing.user?.name}
                icon={<AccountCircleRounded />}
              />
              <DetailRow
                label="Email"
                value={borrowing.user?.email}
                icon={<AlternateEmailRounded />}
              />
              <DetailRow
                label="Phone"
                value={borrowing.user.user_detail?.phone}
                icon={<PhoneRounded />}
              />
              <DetailRow
                label="Address"
                value={borrowing.user.user_detail?.address}
                icon={<HouseRounded />}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full p-8 flex flex-col lg:flex-row gap-x-10 gap-y-8 rounded-lg border bg-white">
        <div className="w-full lg:max-w-64 flex flex-row items-start gap-x-6">
          <img
            src={`${borrowing.book.cover}`}
            alt=""
            className="w-14 md:w-32 lg:w-64 rounded"
          />
          <div className="flex lg:hidden flex-row items-center gap-x-5">
            <p className="font-bold text-lg">{borrowing.book.title}</p>
            <div
              className={clsx(
                "w-16 h-6 flex justify-center items-center font-medium rounded",
                {
                  "rounded bg-green-100 text-green-500":
                    borrowing.book.stock >= 10,
                }, // success
                {
                  "rounded bg-yellow-100 text-yellow-500":
                    borrowing.book.stock < 10 && borrowing.book.stock > 0,
                }, // warning
                {
                  "rounded bg-red-100 text-red-500": borrowing.book.stock == 0,
                } // danger
              )}
            >
              <p>{borrowing.book.stock}</p>
            </div>
          </div>
        </div>
        <div className="w-fit flex flex-col gap-y-12">
          <div className="hidden lg:flex flex-row items-center gap-x-5">
            <p className="max-w-3xl font-bold text-4xl">
              {borrowing.book.title}
            </p>
            <div
              className={clsx(
                "w-16 h-6 flex justify-center items-center font-medium rounded",
                {
                  "rounded bg-red-100 text-red-500": borrowing.book.stock == 0,
                }, // danger
                {
                  "rounded bg-yellow-100 text-yellow-500":
                    borrowing.book.stock < 10 && borrowing.book.stock > 0,
                }, // warning
                {
                  "rounded bg-green-100 text-green-500":
                    borrowing.book.stock >= 10,
                } // success
              )}
            >
              <p>{borrowing.book.stock}</p>
            </div>
          </div>
          <p className="text-justify text-xs md:text-sm lg:text-base">
            {isExpanded ? borrowing.book.synopsis : previewText}
            {/* Add "Show More" or "Show Less" button */}
            <button onClick={toggleContent} className="text-blue-500 ml-2">
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BorrowingDetailPage;

// Reusable Detail Row Component
const DetailRow = ({
  label,
  value,
  icon,
  customClass,
}: {
  label: string;
  value: string | number | undefined;
  icon: JSX.Element;
  customClass?: string;
}) => (
  <div className="py-4 flex flex-row justify-between">
    <div className="flex flex-row items-center gap-x-2 text-slate-500">
      {icon}
      <p>{label}</p>
    </div>
    <p className={clsx(customClass)}>{value}</p>
  </div>
);

// Reusable Date Row Component
const DateRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: JSX.Element;
}) => <DetailRow label={label} value={value} icon={icon} />;

// Function to determine status class
const getStatusClass = (status: string) => {
  switch (status) {
    case "lost":
      return "rounded bg-red-100 text-red-500";
    case "awaiting confirmation":
      return "rounded bg-yellow-100 text-yellow-500";
    case "borrowed":
      return "rounded bg-blue-100 text-blue-500";
    case "returned":
      return "rounded bg-green-100 text-green-500";
    default:
      return "";
  }
};
