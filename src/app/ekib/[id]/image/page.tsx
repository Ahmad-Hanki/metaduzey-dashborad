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
  try {

  
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

  const Images = await prisma.therapy.findMany({
    select: {
      imageUrl: true,
    },
  });
  await prisma.$disconnect();

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
} catch (err) {

} finally {
  await prisma.$disconnect();
}
};

export default UploadImagePage;
