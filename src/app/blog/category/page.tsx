import Container from "@/components/Container";
import prisma from "@/db/client";
import CategoryClient from "./_components/CategoryClient";

const CategoryPage = async () => {
  const data = await prisma.category.findMany({});
  return (
    <div>
      <Container>
        <div className="flex flex-col ">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryClient data={data} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
