import { useEffect, useState } from "react";
import InputComponent from "../../../../components/Input/Input";
import axios from "axios";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { clsx } from "clsx";
import { UserInterface } from "../../../../interfaces/UserInterface";
import { useParams } from "react-router-dom";
import { useGetData } from "@/hooks/apiService";
import { AddPhotoAlternateRounded } from "@mui/icons-material";

const EditUserPage = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [message, setMessage] = useState<{
    message: string | null;
    status: "success" | "error" | null;
  }>({ message: null, status: "success" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputSelectVal, setInputSelectVal] = useState<{
    role: "admin" | "user" | "";
    gender: "male" | "female" | "";
  }>({
    role: "",
    gender: "",
  });
  const { id } = useParams();

  const fetchUser = async () => {
    setIsLoading(true);

    const result = await useGetData(`/users/${id}`);
    if (result.status) {
      setUser(result.data);
      setInputSelectVal({
        role: result.data.role,
        gender: result.data.user_detail?.gender || "",
      });
      setMessage({ message: result.message, status: "success" });
    } else {
      setMessage({ message: result.message, status: "error" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSelectedImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedImage([fileUrl, file]);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setInputSelectVal((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.append("name", e.currentTarget.name.value);
    formData.append("role", inputSelectVal.role);
    formData.append("gender", inputSelectVal.gender);
    formData.append("phone", e.currentTarget.phone.value);
    formData.append("address", e.currentTarget.address.value);
    formData.append("profile", selectedImage[1]);

    axios
      .post(`http://localhost:8000/api/users/${id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        window.location.href = "/dashboard/users";
      })
      .catch((err: any) => {
        if (err.response.data.statusCode === 422) {
          console.error(err.response);
        } else {
          setMessage(err.response.data.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  // clear message
  useEffect(() => {
    setTimeout(() => {
      message &&
        setMessage({
          message: null,
          status: null,
        });
    }, 8000);
  }, []);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full p-4 md:p-6 flex flex-col md:flex-row gap-x-6"
    >
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
      <div className="w-full md:w-6/12 xl:w-4/12 flex flex-col gap-y-6">
        <label
          htmlFor="cover"
          className="h-fit px-6 py-3 flex flex-col gap-y-3 rounded-lg bg-white"
        >
          <h1 className="text-2xl font-bold text-black">COVER</h1>
          <div className="">
            <div className="w-full h-32 flex flex-row justify-center items-center">
              <input
                type="file"
                hidden
                name="cover"
                id="cover"
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleSelectedImage}
              />
              {selectedImage ? (
                <img
                  src={selectedImage[0]}
                  alt="selected image"
                  className="h-32 w-auto object-cover"
                />
              ) : (
                <AddPhotoAlternateRounded sx={{ fontSize: 60 }} />
              )}
            </div>
            <p className="text-sm text-[#94A3B8]">
              Chose cover image. Only *.png, *.jpg and *.jpeg. Maximum file is
              2MB{" "}
            </p>
          </div>
        </label>
        <div className="px-8 py-5 flex flex-col gap-y-6 bg-white">
          <FormControl fullWidth>
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="role-select"
              value={inputSelectVal.role && inputSelectVal.role}
              label="Role"
              name="role"
              className="border-2"
              onChange={handleSelectChange}
            >
              <MenuItem value={"admin"}>admin</MenuItem>
              <MenuItem value={"user"}>user</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender-select"
              value={inputSelectVal.gender}
              label="Gender"
              name="gender"
              className="border-2"
              onChange={handleSelectChange}
            >
              <MenuItem value={"male"}>male</MenuItem>
              <MenuItem value={"female"}>female</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="h-fit w-full flex flex-col items-end gap-y-5">
        <div className="w-full px-8 py-5 flex flex-col gap-y-5 rounded-lg bg-white">
          <div className="inputBox w-full flex flex-col">
            <InputComponent
              name="name"
              type="text"
              value={user?.name}
              className="rounded-lg"
            />
          </div>
          <InputComponent
            value={user?.user_detail?.phone?.replace(/-/g, "")}
            name="phone"
            type="tel"
            className="rounded-lg"
          />
          <textarea
            name="address"
            id=""
            rows={4}
            className="peer border-2  px-2 py-3 w-full rounded-lg"
            placeholder="address"
            defaultValue={user?.user_detail?.address}
          ></textarea>
        </div>
        <div className="flex flex-row gap-x-3">
          <button
            type="reset"
            className="w-full px-4 py-1.5 rounded-lg bg-slate-200 text-black"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full px-4 py-1.5 rounded-lg bg-purple-700 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserPage;
