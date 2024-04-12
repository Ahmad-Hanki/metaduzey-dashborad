import Container from "@/components/Container";
import TherapyImage from "./_components/TherapyImage";
import prisma from "@/db/client";
import { redirect } from "next/navigation";
import { utapi } from "@/server/uploadthing";
import { Image } from "@/types";

interface UploadImagePageProps {
  params: {
    id: string;
  };
}

const UploadImagePage = async ({ params }: UploadImagePageProps) => {
  try {

    const files:Image[] = await utapi.listFiles();

    const imageUrls: { imageUrl: string }[] = files.map(file => ({
      imageUrl: `https://utfs.io/f/${file.key}` // Assuming file.key represents the path to the image
    }));
  
    const data = await prisma.therapy.findFirst({
      where: {
        id: params.id,
      },
      select: {
        imageUrl: true,
        name: true,
      },
    });
    await prisma.$disconnect();

    if (!data) redirect("/ekib");

    return (
      <div>
        <Container>
          <TherapyImage
            id={params.id}
            userImage={data.imageUrl}
            name={data.name}
            Images={imageUrls}
          />
        </Container>
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default UploadImagePage;
