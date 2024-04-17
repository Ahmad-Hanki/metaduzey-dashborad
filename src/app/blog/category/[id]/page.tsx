import prisma from "@/db/client";
import { redirect } from "next/navigation";
import CategoryForm from "../_components/CategoryForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface EditTCategoryPageProps {
  params: {
    id: string;
  };
}

const EditCategoryPage = async ({ params }: EditTCategoryPageProps) => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
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
