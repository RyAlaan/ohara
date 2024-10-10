import { useEffect, useState } from "react";
import InputComponent from "../../../../components/Input/Input";
import { UserInterface } from "../../../../interfaces/UserInterface";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const EditUserPage = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  }, []);

  return user ? (
    <form
      // onSubmit={(e) => handleSubmit(e)}
      className="w-full p-6 flex flex-row gap-x-6"
    >
      <div className="flex flex-col gap-y-6">
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
                // onChange={handleSelectedImage}
              />
              {/* {selectedImage ? (
                <img
                  src={selectedImage[0]}
                  alt="selected image"
                  className="h-32 w-auto object-cover"
                />
              ) : (
                <AddPhotoAlternateRoundedIcon sx={{ fontSize: 60 }} />
              )} */}
            </div>
            <p className="text-sm text-[#94A3B8]">
              Chose cover image. Only *.png, *.jpg and *.jpeg. Maximum file is
              2MB{" "}
            </p>
          </div>
        </label>
      </div>
      <div className="h-fit w-full flex flex-col items-end gap-y-5">
        <div className="px-8 py-5 flex flex-col gap-y-5 rounded-lg bg-white">
          <div className="inputBox w-full flex flex-col">
            <InputComponent
              name="name"
              type="text"
              className="rounded-lg"
              value={user.name}
            />
          </div>
          <div className="flex flex-row gap-x-4">
            <InputComponent
              name="gender"
              type="string"
              value={user.user_detail?.gender}
              className="rounded-lg"
            />
            <InputComponent
              name="role"
              type="string"
              value={user.role}
              className="rounded-lg"
            />
          </div>
          <InputComponent name="phone" type="tel" className="rounded-lg" value={user.user_detail?.phone} />
          <textarea
            name="address"
            id=""
            rows={4}
            className="peer border-2  px-2 py-3 w-full rounded-lg"
            placeholder="Address"
          >{user.user_detail?.address}</textarea>
        </div>
        <div className="flex flex-row gap-x-3">
          <button
            type="reset"
            className="w-full px-4 py-1.5 rounded-lg bg-slate-200 text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full px-4 py-1.5 rounded-lg bg-purple-700 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  ) : (
    <div className="w-full h-96 flex items-center justify-center gap-x-6">
      <p>Loading </p>
      <CircularProgress color="info" size={30} />
    </div>
  );
};

export default EditUserPage;
