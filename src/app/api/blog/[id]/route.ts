import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Category } from "@prisma/client";
import { NextResponse } from "next/server";

interface TherapyTypeProps {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: TherapyTypeProps) {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  if (!auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }

  const { title, summery, yazar, blogCategories, imageUrl } = await req.json();

  if (!title || !summery || blogCategories.length < 1 || !yazar || !imageUrl) {
    return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
  }

  try {
    await prisma.blogCategory.deleteMany({
      where: { blogId: params.id },
    });
    await prisma.$disconnect();

    const editedBlog = await prisma.blog.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        summery,
        yazan: yazar,

        blogCategories: {
          createMany: {
            data: blogCategories.map((place: Category) => ({
              categoryId: place.id,
            })),
          },
        },
      },
    });
    await prisma.$disconnect();

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
  finally{
    await prisma.$disconnect();
  }
}

export async function DELETE(req: Request, { params }: TherapyTypeProps) {
  const { isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  if (!auth) {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }
  await prisma.$disconnect();

  try {
    await prisma.blog.delete({
      where: {
        id: params.id,
      },
    });
    await prisma.$disconnect();

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
  finally{
    await prisma.$disconnect();
  }
}


export async function GET(req: Request, { params }: TherapyTypeProps) {
  try {
    await prisma.$disconnect();

    const blog = await prisma.blog.findFirst({
      where:{
        id:params.id
      },
      include: {
       blogCategories:{
        select:{
          category:true
        }
       }
      }
    })
    await prisma.$disconnect();


    if (!blog)    return NextResponse.json(
      { error: "No data was found." },
      { status: 404 }
    );
    
    return NextResponse.json(blog, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 }
    );
  } finally{
    await prisma.$disconnect();
  }
}