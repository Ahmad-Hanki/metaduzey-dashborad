import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TherapyPlaceForm from "../_components/TherapyPlaceForm"
import { redirect } from "next/navigation";

const CreatePage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  return (
    <div>
        <TherapyPlaceForm/>
    </div>
  )
}

export default CreatePage