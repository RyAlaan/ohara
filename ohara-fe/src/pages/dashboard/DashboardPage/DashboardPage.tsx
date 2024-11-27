import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { useSearchBooks } from "../../../context/SearchBooksContext/SearchBooksContext";
import UsersCardLayout from "../../../layouts/UsersCardLayout/UsersCardLayout";
import BorrowingTargetLayout from "../../../layouts/BorrowingTargetLayout/BorrowingTargetLayout";
import BorrowingConfirmationLayout from "../../../layouts/BorrowingConfirmationLayout/BorrowingConfirmationLayout";
import CategoriesCardLayout from "../../../layouts/CategoriesCardLayout/CategoriesCardLayout";
import AvailableVolsLayout from "../../../layouts/AvailableVolsLayout/AvailableVolsLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useGetData } from "@/hooks/apiService";

const DashboardPage = () => {
  const { books } = useSearchBooks();

  const [curr, setCurr] = useState<number>(10);
  const [percentage, setPercentage] = useState<number>(0);
  const totalPage = 20;
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const result = await useGetData('/dashboard')
      if (result.status) {
        setDashboardData(result.data);
      }
    }

    fetchData()
    setIsLoading(false);
  }, [])
  
  useEffect(() => {
    setPercentage((curr / totalPage) * 100);
  }, [totalPage, curr]);

  function getWeekDaysFromMonday(year: number, month: number, day: number) {
    let date = new Date(year, month, day);

    const dayOfWeek = date.getDay();
    const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    date.setDate(date.getDate() + diff);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
      date.setDate(date.getDate() + 1);
    }

    return weekDays;
  }

  const currentTime = new Date();
  const weekDates = getWeekDaysFromMonday(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate()
  );

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 col-span-12 gap-4 sm:gap-8">
        <CategoriesCardLayout />
        <UsersCardLayout />
        <BorrowingTargetLayout percentage={percentage} />
      </div>
      <div className="col-span-12 min-h-96 w-full bg-white rounded-xl">
        <p className="px-6 font-bold text-xl md:text-2xl pt-3">
          Borrowing In This Week
        </p>
        <BarChart
          grid={{ horizontal: true }}
          xAxis={[
            {
              scaleType: "band",
              data: weekDates,
            },
          ]}
          series={[{ data: [15, 10, 25, 20, 25, 30, 20] }]}
          height={320}
        />
      </div>
      <div className="col-span-12 flex flex-col md:flex-row gap-4 sm:gap-8">
        <BorrowingConfirmationLayout />
        <AvailableVolsLayout books={books} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
