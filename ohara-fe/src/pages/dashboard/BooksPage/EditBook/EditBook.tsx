import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import InputComponent from "../../../../components/Input/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { AddRounded } from "@mui/icons-material";

const EditBookPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { id } = useParams();

  const d = new Date();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => {
        const categoryNames = res.data.data.map(
          (category: { name: string }) => category.name
        );
        setCategories(categoryNames);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleCategoriesChange = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleSelectedImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedImage([fileUrl, file]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.currentTarget.title.value);
    formData.append("ISBN", e.currentTarget.ISBN.value);
    formData.append("releasedDate", e.currentTarget.releasedDate.value);
    formData.append("publisher", e.currentTarget.publisher.value);
    formData.append("stock", e.currentTarget.stock.value);
    formData.append("price", e.currentTarget.price.value);
    formData.append("synopsis", e.currentTarget.synopsis.value);
    formData.append("cover", selectedImage[1]);
    
    axios
      .post(`http://localhost:8000/api/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        responseType: "json",
      })
      .then((res) => {
        console.log("book added");
      })
      .catch((err) => {
        console.log(formData);
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full p-6 flex flex-row gap-x-6 font-poppins"
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
                onChange={handleSelectedImage}
              />
              {selectedImage ? (
                <img
                  src={selectedImage[0]}
                  alt="selected image"
                  className="h-32 w-auto object-cover"
                />
              ) : (
                <AddPhotoAlternateRoundedIcon sx={{ fontSize: 60 }} />
              )}
            </div>
            <p className="text-sm text-[#94A3B8]">
              Chose cover image. Only *.png, *.jpg and *.jpeg. Maximum file is
              2MB{" "}
            </p>
          </div>
        </label>
        <div className="px-8 py-5 flex flex-col gap-y-4 bg-white rounded-lg">
          <h1 className="text-2xl font-semibold text-black">Categories</h1>
          <FormControl className="w-full rounded-lg">
            <InputLabel id="categories-checkbox">Categories</InputLabel>
            <Select
              labelId="categories-checkbox"
              id="categories"
              name="categories"
              multiple
              value={selectedCategories}
              onChange={handleCategoriesChange}
              input={
                <OutlinedInput
                  label="Categories"
                  className="rounded-lg border-2 border-slate-300"
                />
              }
              renderValue={(selected) => selected.join(", ")}
              // MenuProps={MenuProps}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  <Checkbox checked={selectedCategories.includes(category)} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Link
            to={"/dashboard/categories/add"}
            className="w-full p-4 flex flex-row items-center gap-x-2 text-purple-700 rounded-lg bg-purple-100 hover:bg-purple-700 hover:text-white transition-colors duration-500"
          >
            <AddRounded />
            <p>Add new categories</p>
          </Link>
        </div>
        <div className="px-8 py-5 flex flex-col gap-y-4 bg-white rounded-lg">
          <h1 className="text-2xl font-semibold text-black">Authors</h1>
          <InputComponent name="author" type="text" className="rounded-lg" />
          <p className="text-sm text-[#94A3B8]">
            If author is more than 1 person. Please use comma plus space(, ).
            e.g. Alan Turing, John Doe.
          </p>
        </div>
      </div>
      <div className="h-fit w-full flex flex-col items-end gap-y-5">
        <div className="w-full px-8 py-5 flex flex-col gap-y-3 rounded-lg bg-white">
          <h1 className="text-4xl font-bold text-black">General</h1>
          <div className="flex flex-col gap-y-5">
            <div className="inputBox w-full flex flex-col">
              <InputComponent name="title" type="text" className="rounded-lg" />
            </div>
            <div className="inputBox w-full flex flex-col">
              <InputComponent
                label="ISBN"
                name="ISBN"
                type="text"
                className="rounded-lg"
              />
            </div>
            <div className="w-full flex flex-row gap-x-4">
              <InputComponent
                label="Released Year"
                name="releasedDate"
                type="number"
                max="2099"
                value={d.getFullYear()}
                className="rounded-lg"
              />
              <InputComponent
                name="publisher"
                type="string"
                className="rounded-lg"
              />
            </div>
            <div className="w-full flex gap-x-4">
              <InputComponent
                name="stock"
                min="1"
                type="number"
                className="rounded-lg"
              />
              <InputComponent
                name="price"
                type="number"
                className="rounded-lg"
              />
            </div>
            <textarea
              name="synopsis"
              id=""
              rows={4}
              className="peer border-2  px-2 py-3 w-full rounded-lg"
              placeholder="Synopsis"
            ></textarea>
          </div>
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
  );
};

export default EditBookPage;
