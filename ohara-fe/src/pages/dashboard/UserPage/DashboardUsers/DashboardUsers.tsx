import { Link, useSearchParams } from "react-router-dom";
import {
  Add,
  DeleteOutlineOutlined,
  EditNoteOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserInterface } from "../../../../interfaces/UserInterface";
import { PaginationInterface } from "../../../../interfaces/PaginationInterface";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Modal,
  Pagination,
  Typography,
} from "@mui/material";
import clsx from "clsx";

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
  const [queryParam, _] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<{
    message: string | null;
    status: "success" | "error" | null;
  }>({ message: null, status: "success" });
  const [pagination, setPagination] = useState<PaginationInterface | null>(
    null
  );

  const deleteUser = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        window.location.reload();
        setMessage({ message: res.data.message, status: "success" });
      })
      .catch((err) => {
        setMessage({ message: err.res.data.message, status: "error" });
      });
  };

  useEffect(() => {
    console.log(message.message);

    setTimeout(() => {
      message &&
        setMessage({
          message: null,
          status: null,
        });
    }, 8000);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/users", {
        params: {
          perPage: queryParam.get("perPage"),
          page: queryParam.get("page"),
          name: queryParam.get("name"),
          email: queryParam.get("email"),
          role: queryParam.get("role"),
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMessage({ message: res.data.message, status: "success" });
        setPagination(res.data.pagination);
        setUsers(res.data.data);
      })
      .catch((err) => {
        setMessage({ message: err.res.data.message, status: "error" });
      });
  }, []);

  return (
    <div className="min-h-screen w-full p-6">
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
      <div className="min-h-screen min-w-[586px] w-full px-5 pt-3 pb-5 flex flex-col gap-y-6 rounded xl:rounded-lg bg-white">
        <div className="w-full flex flex-row justify-between">
          <h4 className="font-semibold text-xl">All Users</h4>
          <div className="w-fit flex flex-row gap-x-5">
            <div className="flex flex-row items-center gap-x-3">
              <p className="font-medium">Categories</p>
              <div
                className="p-2.5 flex flex-row gap-2 rounded-md font-bold text-purple-700
               bg-purple-100 cursor-pointer"
              >
                <p>Show More</p>
                {/* <KeyboardArrowDownRounded /> */}
              </div>
            </div>
            <Link
              to={"/dashboard/users/add"}
              className="p-2.5 flex flex-row gap-2 rounded-md font-bold text-purple-700 bg-purple-100"
            >
              <Add></Add>
              <p>Add User</p>
            </Link>
          </div>
        </div>
        <div className="font-sans flex flex-col gap-2 rounded-t overflow-hidden">
          <div className="thead">
            <div className="tr min-w-full px-2 py-3 flex flex-row justify-between gap-x-3 bg-slate-100">
              <div className="th min-w-12 text-end">No</div>
              <div className="th min-w-64">user</div>
              <div className="th min-w-20 text-end">role</div>
              <div className="th min-w-20 text-end">gender</div>
              <div className="th min-w-32 text-end">phone</div>
              <div className="th min-w-40 text-center">action</div>
            </div>
          </div>
          <div className="body">
            {users ? (
              users.map((user, id) => (
                <div
                  key={id}
                  className="tr min-w-full px-2 py-3 flex flex-row justify-between items-center gap-x-3 border-b border-slate-300"
                >
                  <div className="th min-w-12 text-end">{id + 1}</div>
                  <div className="th min-w-64 flex flex-row items-center gap-3">
                    <Avatar
                      src={"http://localhost:8000" + user.user_detail?.profile}
                    />
                    <div className="">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="th min-w-20 text-end">{user.role}</div>
                  <div className="th min-w-20 text-end">
                    {user.user_detail?.gender}
                  </div>
                  <div className="th min-w-32 text-end">
                    {user.user_detail?.phone}
                  </div>
                  <div className="th min-w-40 flex flex-row items-center justify-center gap-x-2">
                    <div className="p-1 rounded bg-red-100 cursor-pointer">
                      <DeleteOutlineOutlined
                        className="text-red-600"
                        onClick={() => deleteUser(user.id)}
                      />
                    </div>
                    <Link
                      to={`/dashboard/users/edit/${user.id}`}
                      className="p-1 rounded bg-yellow-100 cursor-pointer"
                    >
                      <EditNoteOutlined className="text-yellow-600" />
                    </Link>
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
                queryParam.get("page")
                  ? parseInt(queryParam.get("page") as string)
                  : 1
              }
              variant="outlined"
              shape="rounded"
            />
          )}
      </div>
    </div>
  );
};

export default DashboardUserPage;
