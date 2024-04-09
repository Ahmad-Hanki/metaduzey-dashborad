import Container from "@/components/Container";
import TherapyImage from "./_components/TherapyImage";
import prisma from "@/db/client";
import { redirect } from "next/navigation";

interface UploadImagePageProps {
  params: {
    id: string;
  };
}

const UploadImagePage = async ({ params }: UploadImagePageProps) => {
  const data = await prisma.therapy.findFirst({
    where: {
      id: params.id,
    },
    select: {
      imageUrl: true,
      name: true,
    },
  });

  if (!data) redirect("/ekib");

  const Images = await prisma.therapy.findMany({
    select: {
      imageUrl: true,
    },
  });
  return (
    <div>
      <Container>
        <TherapyImage
          id={params.id}
          userImage={data.imageUrl}
          name={data.name}
          Images={Images}
        />
      </Container>
    </div>
  );
};

export default UploadImagePage;
