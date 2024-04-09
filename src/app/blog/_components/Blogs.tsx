"use client";
import { AlertModal } from "@/components/AlertModal";
import { formatDate } from "@/utils/formatter";
import { Blog } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
interface BlogsProps {
  blogs: ({
    blogCategories: {
      category: {
        name: string;
      };
    }[];
  } & {
    id: string;
    title: string;
    summery: string;
    yazan: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  })[];
}
const Blogs = ({ blogs }: BlogsProps) => {
  const router = useRouter();
  const [open, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const onDelete = async () => {
    try {
      const res = await axios.delete(`/api/blog/${id}`);
      if (res.status == 200) {
        toast.success("Deleted Successfully");
        setIsOpen(false)
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={onDelete}
      />
      <div className="border border-black/50 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="shadow-md flex  flex-col gap-2 items-center pt-2"
            >
              <div
                onClick={() => router.push(`/blog/${blog.id}`)}
                className="relative cursor-pointer overflow-hidden w-52 aspect-square pt-3"
              >
                <Image
                  fill
                  className="object-cover object-center"
                  alt="photo"
                  src={blog.imageUrl}
                />
              </div>
              <div className="flex flex-col items-center p-2 gap-3">
                <h1 className="text-2xl font-bold"> {blog.title}</h1>
                <p>{formatDate(blog.createdAt)}</p>
                <div>
                  {/* Map through blogCategories and render category names */}
                  {blog.blogCategories.map((category, index) => (
                    <span key={index} className="text-sm text-gray-600">
                      {category.category.name}
                      {index !== blog.blogCategories.length - 1 && ", "}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setIsOpen(true);
                    setId(blog.id);
                  }}
                  className="btn btn-ghost z-20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
