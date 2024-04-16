import prisma from "@/db/client";
import BlogForm from "../_components/BlogForm";

const CreateBlog = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        imageUrl: true,
      },
    });
    await prisma.$disconnect();

    const category = await prisma.category.findMany({});
    await prisma.$disconnect();

    return (
      <div>
        <BlogForm category={category} prevImages={blogs} blog={true} />
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default CreateBlog;
