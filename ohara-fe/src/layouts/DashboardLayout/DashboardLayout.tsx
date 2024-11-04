import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full p-4 md:p-6 grid grid-cols-12 gap-4 sm:gap-8">
      {children}
    </div>
  );
};

export default DashboardLayout;
