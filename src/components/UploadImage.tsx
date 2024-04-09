"use client";
import { UploadButton } from "@/utils/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import ImagesSwiper from "@/app/ekib/[id]/image/_components/ImagesSwiper";

interface UploadImageProps {
  userImage: string;
  userName: string;
  prevImages: { imageUrl: string }[];
}

const UploadImage = ({ userImage, userName, prevImages }: UploadImageProps) => {
  const defaultImageUrl =
    "https://res.cloudinary.com/ddxser4ml/image/upload/txwk370nwk6kg6hxluxn.jpg";

    const filteredImages = prevImages.filter(url => url.imageUrl !== defaultImageUrl);
  const [imageUrl, setImageUrl] = useState(userImage);
  return (
    <div className="flex flex-col gap-20">
      <div className="flex-1 flex items-center flex-col gap-5">
        <h1 className="text-3xl font-bold">{userName}</h1>

        {imageUrl && (
          <div className="relative aspect-square overflow-hidden h-48 ">
            <Image
              alt="photo"
              fill
              className="object-cover object-center rounded-full"
              src={imageUrl}
            />
            <Trash
              size={30}
              className="cursor-pointer absolute top-0 right-0 z-20 text-red-800 hover:bg-slate-100 rounded-md"
              onClick={() => setImageUrl(defaultImageUrl)}
            />
          </div>
        )}
        <div className="flex gap-5">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />

          <input value={imageUrl} id="image" name="image" type="text" hidden />

          <SubmitButton submit="Save Changes" submitting="Saving..." />
        </div>
      </div>
      <div className="flex-1">
        <ImagesSwiper prevImages={filteredImages} setImageUrl={setImageUrl} />
      </div>
    </div>
  );
};

export default UploadImage;
