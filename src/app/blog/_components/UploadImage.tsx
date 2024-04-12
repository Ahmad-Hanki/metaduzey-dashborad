"use client";
import ImagesSwiper from "@/app/ekib/[id]/image/_components/ImagesSwiper";
import SubmitButton from "@/components/SubmitButton";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/utils/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UploadImageProps {
  prevImages?: { imageUrl: string }[];
  currentImage?: string;
  blog?:boolean
}

const UploadImage = ({ prevImages, currentImage, blog }: UploadImageProps) => {
  const [imageUrl, setImageUrl] = useState(currentImage?? '');
  return (
    <div className="flex flex-col gap-20">
      <div className="flex-1 flex items-center flex-col gap-5">
        {!imageUrl && <h1 className="text-3xl font-bold">Upload Image</h1>}

        {imageUrl != "" && (
          <div className="relative aspect-square overflow-hidden h-48 ">
            <Image
              alt="photo"
              fill
              className={cn("object-cover object-center rounded-full", blog? 'rounded-md' :'')}
              src={imageUrl}
            />
            <Trash
              size={30}
              className="cursor-pointer absolute top-0 right-0 z-20 text-red-800 hover:bg-slate-100 rounded-md"
              onClick={() => setImageUrl("")}
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

          <input defaultValue={imageUrl} id="image" name="image" type="text" hidden />

          <SubmitButton submit="Save Changes" submitting="Saving..." />
        </div>
      </div>

      <div className="flex-1">
        {prevImages && (
          <ImagesSwiper prevImages={prevImages} setImageUrl={setImageUrl} />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
