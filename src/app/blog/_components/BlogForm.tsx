"use client";

import Container from "@/components/Container";
import SubmitButton from "@/components/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Blog, Category } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangeEvent, useState } from "react";
import UploadImage from "./UploadImage";

interface BlogFormProps {
  initialData?: Blog;
  category: Category[];
  prevImages: { imageUrl: string }[];
}

interface CheckedCategory {
  id: string;
  name: string;
}

const BlogForm = ({ category, initialData, prevImages }: BlogFormProps) => {
  const [checkedCategory, setCheckedCategory] = useState<CheckedCategory[]>([]);

  const [checkedCategoryValidation, setCheckedCategoryValidation] =
    useState(false);

  const [imageValidation, setImageValidation] = useState(false);
  const router = useRouter();

  const handleCategoryCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { id, name, checked } = event.target;
    if (checked) {
      setCheckedCategory((prevTherapies) => [
        ...prevTherapies,
        { id: id, name: name },
      ]);
      setCheckedCategoryValidation(false);
    } else {
      setCheckedCategory((prevTherapies) =>
        prevTherapies.filter((therapy) => therapy.id !== id)
      );
    }
  };

  const onAction = async (formData: FormData) => {
    const imageUrl = formData.get("image");
    const title = formData.get("title");
    const summery = formData.get("summery");
    const yazar = formData.get("yazar");

    if (checkedCategory.length < 1) {
      setCheckedCategoryValidation(true);
      return null;
    }
    if (imageUrl == "") {
      setImageValidation(true);
      return null;
    }
    if (!title || !summery || !yazar) {
      toast.error("Data required");
      return null;
    }

    const data = {
      imageUrl,
      title,
      summery,
      yazar,
      blogCategories: checkedCategory,
    };

    try {
      const res = await axios.post("/api/blog", data);
      if (res.status == 200) {
        toast.success("Blog Added Successfully");
        router.push("/blog");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-200 pt-7">
      <Container>
        <form action={onAction} className="grid grid-cols-1 gap-5">
          <input
            className="bg-slate-50 h-10 p-4 text-center"
            type="text"
            name="title"
            required
            defaultValue={initialData?.title}
            placeholder="Title "
          />

          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="summery"
            defaultValue={initialData?.summery ?? ""}
            placeholder="Summery"
            required
          />

          <input
            className="bg-slate-50 h-10 p-4 text-center"
            type="text"
            name="yazar"
            required
            defaultValue={initialData?.title}
            placeholder="Yazar"
          />

          <div className="flex flex-col gap-4 items-center md:flex-row md:gap-10 md:justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-3">
                <p>Tür seç </p>

                {checkedCategoryValidation ? (
                  <p className="text-red-600">Required</p>
                ) : (
                  <></>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-3 p-4">
                {category.map((type, i) => (
                  <div key={type.id} className="flex items-center gap-5">
                    <input
                      type="checkbox"
                      id={type.id}
                      value={type.id}
                      name={type.name}
                      onChange={handleCategoryCheckboxChange}
                      checked={checkedCategory.some(
                        (category) => category.id === type.id
                      )}
                    />
                    <label
                      htmlFor={type.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.name}
                    </label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-full flex justify-center md:justify-start flex-col">
            {imageValidation && (
              <p className="text-red-600 text-center">Image is Required</p>
            )}
            <UploadImage
              prevImages={prevImages}
              currentImage={initialData?.imageUrl}
            />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default BlogForm;
