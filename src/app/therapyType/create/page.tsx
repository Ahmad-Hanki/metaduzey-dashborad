import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TherapyTypeForm from "../_components/TherapyTypeForm"
import { redirect } from "next/navigation";

const page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  return (
    <div>
        <TherapyTypeForm/>
    </div>
  )
}

export default page