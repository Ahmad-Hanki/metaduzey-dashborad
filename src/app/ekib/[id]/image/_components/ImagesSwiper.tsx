"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Trash } from "lucide-react";
import { deletePhoto } from "@/actions/deletePhoto";

interface ImagesSwiperProps {
  prevImages: { imageUrl: string }[];
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ImagesSwiper = ({ prevImages, setImageUrl }: ImagesSwiperProps) => {
  if (prevImages.length < 1) {
    return <div className="flex justify-center"></div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center font-bold text-3xl flex-1">Prevues Images:</h1>
      <div className="w-full flex justify-center flex-1">
        <Swiper
          className="flex justify-center w-full"
          spaceBetween={50}
          slidesPerView={4}
          scrollbar={{ draggable: true }}
        >
          {prevImages.map((url, i) => {
            return (
              <SwiperSlide
                className="cursor-pointer w-full"
                key={i}
                onClick={() => setImageUrl(url.imageUrl)}
              >
                <div>
                  <Image
                    alt="photo"
                    width={250}
                    height={250}
                    src={url.imageUrl}
                    className="object-cover object-center"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ImagesSwiper;
