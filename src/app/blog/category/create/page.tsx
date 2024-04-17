import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CategoryForm from "../_components/CategoryForm"
import { redirect } from "next/navigation";

const CategoryCreatePage =async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  return (
    <div>
        <CategoryForm/>
    </div>
  )
}

export default CategoryCreatePage