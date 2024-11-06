import { useDeleteData, useGetData } from "@/hooks/apiService";
import { PaginationInterface } from "@/interfaces/PaginationInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import {
  Add,
  DeleteOutlineOutlined,
  EditNoteOutlined,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { Alert, Avatar, CircularProgress, Pagination } from "@mui/material";
import axios from "axios";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DashboardUserPage = () => {
  const [users, setUsers] = useState<UserInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const [message, setMessage] = useState<{
    message: string | null;
    status: "success" | "error" | null;
  }>({ message: null, status: "success" });
  const [pagination, setPagination] = useState<PaginationInterface | null>(
    null
  );

  const setPage = (page: string) => {
    console.log("jembut");
    setSearchParam({ page: page });
    // searchParam.append("page", page);
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    const result = await useDeleteData(`/users/${id}`);
    if (result.status) {
      window.location.reload();
      setMessage({ message: result.message, status: "success" });
    } else {
      setMessage({ message: result.message, status: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      message &&
        setMessage({
          message: null,
          status: null,
        });
    }, 8000);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const param = {
        perPage: searchParam.get("perPage"),
        page: searchParam.get("page"),
        name: searchParam.get("name"),
        email: searchParam.get("email"),
        role: searchParam.get("role"),
      };

      const result = await useGetData("/users", param);
      if (result.status) {
        setMessage({ message: result.message, status: "success" });
        setPagination(result.pagination);
        setUsers(result.data);
      } else {
        setMessage({ message: result.message, status: "error" });
      }
      setLoading(false);
    }

    fetchUser();
  }, [searchParam.get("page")]);

  return (
    <div className="min-h-screen w-full p-6 overflow-hidden">
      <Alert
        className={clsx(
          { "translate-y-48": message.message },
          "right-1/2 translate-x-1/2 absolute -top-20  max-w-96 w-full text-justify transition-all duration-500 ease-linear z-[9999]"
        )}
        variant="filled"
        severity={message.status ? message.status : "info"}
      >
        {message.message}
      </Alert>
      <div className="w-full px-5 pt-3 pb-5 flex flex-col gap-y-6 rounded xl:rounded-lg bg-white overflow-hidden">
        <div className="w-full flex flex-col md:flex-row justify-between gap-y-3 overflow-hidden">
          <h4 className="font-semibold text-xl">All Users</h4>
          <div className="w-fit flex flex-col md:flex-row gap-y-2 gap-x-5">
            <div className="flex flex-row items-center gap-x-3">
              <p className="text-sm font-medium">Categories</p>
              <div
                className="p-1 md:p-2.5 flex flex-row gap-1 md:gap-2 rounded-md text-sm font-bold text-purple-700
               bg-purple-100 cursor-pointer"
              >
                <p>Show More</p>
                <KeyboardArrowDownRounded sx={{ fontSize: 20 }} />
              </div>
            </div>
            <Link
              to={"/dashboard/users/add"}
              className="w-fit p-2 md:p-2.5 flex flex-row gap-1 md:gap-2 rounded-md text-sm font-bold text-purple-700 bg-purple-100"
            >
              <Add sx={{ fontSize: 20 }} />
              <p>Add Users</p>
            </Link>
          </div>
        </div>
        {/* begin table */}
        <div className="w-full max-w-full p-6 rounded-md">
          <div className="w-full max-w-full overflow-auto scrollbar-thin">
            <div className="w-fit min-w-full px-1.5 md:px-4 py-2 flex flex-row items-center gap-x-4 justify-between rounded-t-md bg-slate-100 *:px-2 *:py-3 *:text-sm *:font-semibold ">
              <div className="min-w-12 text-end">No</div>
              <div className="min-w-64">user</div>
              <div className="min-w-20 text-center">role</div>
              <div className="min-w-20 text-center">gender</div>
              <div className="min-w-32 text-center">phone</div>
              <div className="min-w-40 text-center">action</div>
            </div>
            {!loading ? (
              users?.map((user: UserInterface) => (
                <div
                  key={user.id}
                  className="w-full px-1.5 md:px-4 py-2 flex flex-row items-center gap-x-4 justify-between border-b border-slate-100 *:px-2 *:py-3"
                >
                  <div className="min-w-12 text-sm text-end">{user.id}</div>
                  <div className="min-w-64 text-sm flex items-center gap-x-2">
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      alt={`${user.role}`}
                      src={`${user.user_detail?.profile}`}
                    />
                    <p>{user.name}</p>
                  </div>
                  <div className="min-w-20 text-sm text-center">
                    {user.role}
                  </div>
                  <div className="min-w-20 text-sm">
                    {user.user_detail?.gender}
                  </div>
                  <div className="min-w-32 text-sm text-end">
                    {user.user_detail?.phone}
                  </div>
                  <div className="min-w-40 flex flex-row items-center justify-center gap-x-2">
                    <Link
                      to={`/dashboard/users/edit/${user.id}`}
                      className="p-1 rounded bg-yellow-100 cursor-pointer"
                    >
                      <EditNoteOutlined className="text-yellow-600" />
                    </Link>
                    <div className="p-1 rounded bg-red-100 cursor-pointer">
                      <DeleteOutlineOutlined
                        className="text-red-600"
                        onClick={() => deleteUser(user.id)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full min-h-48 flex flex-row items-center justify-center gap-x-4">
                <p>Loading </p>
                <CircularProgress color="info" size={30} />
              </div>
            )}
          </div>
        </div>
        {pagination &&
          Math.ceil(pagination.totalData / pagination.perPage) > 1 && (
            <Pagination
              count={Math.ceil(pagination.totalData / pagination.perPage)}
              page={
                searchParam.get("page")
                  ? parseInt(searchParam.get("page") as string)
                  : 1
              }
              onChange={(_, num) => setPage(String(num))}
              variant="outlined"
              shape="rounded"
            />
          )}
      </div>
    </div>
  );
};

export default DashboardUserPage;
