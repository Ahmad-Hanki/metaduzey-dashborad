"use client";

import UploadImage from "@/components/UploadImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImagesSwiper from "./ImagesSwiper";

interface TherapyImageProps {
  name: string;
  id: string;
  userImage: string;
  Images: { imageUrl: string }[];
}

const TherapyImage = ({ id, userImage, name, Images }: TherapyImageProps) => {
  const route = useRouter();
  async function onSubmit(formData: FormData) {
    const image = formData.get("image");

    try {
      const res = await axios.patch(`/api/ekib/${id}/image`, { image });
      if (res.status == 200) {
        toast.success("Successfully added image.");
        route.push("/ekib");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="flex flex-col ">
      <div className="flex-1">
        <form action={onSubmit}>
          <UploadImage userImage={userImage} userName={name} prevImages={Images}/>
        </form>
      </div>
    </div>
  );
};

export default TherapyImage;
