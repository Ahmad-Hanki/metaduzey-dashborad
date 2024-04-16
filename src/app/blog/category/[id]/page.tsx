import prisma from "@/db/client";
import { redirect } from "next/navigation";
import CategoryForm from "../_components/CategoryForm";

interface EditTCategoryPageProps {
  params: {
    id: string;
  };
}

const EditCategoryPage = async ({ params }: EditTCategoryPageProps) => {

    const data = await prisma.category.findFirst({
      where: {
        id: params.id,
      },
    });
    if (!data) redirect("/therapyType");
    return (
      <div>
        <CategoryForm data={data} />
      </div>
    );
 
};

export default EditCategoryPage;
