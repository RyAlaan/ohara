import { PieChart } from "@mui/x-charts";

const CategoriesCardLayout = () => {
  const data = [
    { id: 0, label: "Action", value: 80 },
    { id: 1, label: "Mecha", value: 10 },
    { id: 2, label: "Sport", value: 30 },
    { id: 3, label: "Sci-fi", value: 65 },
    { id: 4, label: "Other", value: 47 },
  ];

  return (
    <div className="categories-data col-span-12 md:col-span-6 xl:col-span-4 p-5 flex flex-col gap-y-4 md:gap-y-8 xl:gap-y-14 rounded-xl bg-white">
      <div className="flex flex-row gap-x-1.5 items-end">
        <p className="font-bold text-5xl">30</p>
        <p className="font-bold text-base">CATEGORIES</p>
      </div>
      <div className="flex flex-row gap-x-8">
        <PieChart
          sx={{ flex: 1 }}
          series={[
            {
              data: data,
              innerRadius: 45,
              outerRadius: 30,
              cornerRadius: 0,
              startAngle: -90,
              endAngle: 360,
              cx: 45,
              cy: 45,
            },
          ]}
          height={100}
        />
      </div>
    </div>
  );
};

export default CategoriesCardLayout;
