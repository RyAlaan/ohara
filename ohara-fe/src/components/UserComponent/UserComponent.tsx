import { useAuth } from "@/context/AuthContext/AuthContext";

const UserComponent = () => {
  const { user } = useAuth();

  return (
    <div className="profile w-56 px-2.5 py-5 flex flex-row justify-end gap-x-[14px]">
      <div className="userData text-end">
        <p className="font-semibold text-sm">{user?.name}</p>
        <p className="text-xs">{user?.email}</p>
      </div>
      <div className="pfp h-10 w-10 rounded-full bg-slate-200"></div>
    </div>
  );
};

export default UserComponent;
