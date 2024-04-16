import prisma from "@/db/client";
import { redirect } from "next/navigation";
import CategoryForm from "../_components/CategoryForm";

interface EditTCategoryPageProps {
  params: {
    id: string;
  };
}

const EditCategoryPage = async ({ params }: EditTCategoryPageProps) => {
  try {
    const data = await prisma.category.findFirst({
      where: {
        id: params.id,
      },
    });
    await prisma.$disconnect();

    if (!data) redirect("/therapyType");
    return (
      <div>
        <CategoryForm data={data} />
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default EditCategoryPage;
