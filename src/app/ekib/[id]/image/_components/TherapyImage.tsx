"use client";

import UploadImage from "@/components/UploadImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface TherapyImageProps {
  name: string;
  id: string;
  userImage: string;
}

const TherapyImage = ({ id, userImage, name }: TherapyImageProps) => {

  const route = useRouter();
  async function onSubmit(formData: FormData) {
    const image = formData.get("image");

    try {
    const res = await axios.patch(`/api/ekib/${id}/image`, {image});
    if (res.status == 200) {
      toast.success('Successfully added image.')
      route.push('/ekib');

      // in the table show a small icon of the photo 
    }
    } catch (err) {
      toast.error('Something went wrong!')
    }

  }


  return (
    <div>
      <form action={onSubmit}>
        <UploadImage userImage={userImage} userName={name} />
      </form>
    </div>
  );
};

export default TherapyImage;
