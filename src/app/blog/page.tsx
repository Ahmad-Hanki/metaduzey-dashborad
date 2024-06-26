import Container from "@/components/Container";
import BlogClient from "./_components/BlogClient";
import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const BlogsPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        blogCategories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    await prisma.$disconnect();

    return (
      <div>
        <Container>
          <div></div>
          <div className="flex flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <BlogClient data={blogs} />
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default BlogsPage;
