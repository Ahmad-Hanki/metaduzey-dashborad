import prisma from "@/db/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Category } from "@prisma/client";
import { NextResponse } from "next/server";


export const POST = async (req:Request) => {
    const { isAuthenticated } = getKindeServerSession();
    const auth = await isAuthenticated();
  
    if (!auth) {
      return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
    }

    const {title, summery, yazar, blogCategories, imageUrl} = await req.json();

    if (!title || !summery || !yazar || blogCategories.length < 1 || !imageUrl) {
        return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    try {

        await prisma.blog.create({
            data: {
                imageUrl, summery, title, yazan:yazar,
                blogCategories: {
                    createMany: {
                      data: blogCategories.map((category: Category) => ({
                        categoryId: category.id,
                      })),
                    },
                  },
            }
        })
        await prisma.$disconnect()

        return NextResponse.json({  }, { status: 200 });

    } catch( err) {
        console.log(err);
        return NextResponse.json({ message: "SomeThing went wrong" }, { status: 500 });

    } finally{
      await prisma.$disconnect()

    }
  
}


export async function GET(req: Request) {

  try {
    const blog = await prisma.blog.findMany({
      include: {
        blogCategories:{
          select:{
            category:true
          }
        }
      }
    }) 

    
    return NextResponse.json(blog, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 }
    );
  }
}