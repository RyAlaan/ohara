import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const ToggleDarkModeComponent = () => {
  return (
    <div className="toggle h-fit min-w-16 p-1 hidden md:flex rounded-full bg-[#E1E8F0] dark:bg-purple-700">
      <LightModeOutlined
        className="block dark:hidden bg-white rounded-full"
        fontSize="small"
      />
      <DarkModeOutlined
        className="hidden dark:block bg-white rounded-full"
        fontSize="small"
      />
    </div>
  );
};

export default ToggleDarkModeComponent;
