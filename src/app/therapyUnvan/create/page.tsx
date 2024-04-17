import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TherapyUnvanForm from "../_components/TherapyUnvanForm";
import { redirect } from "next/navigation";

const page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) redirect("/api/auth/logout");
  return (
    <div>
      <TherapyUnvanForm />
    </div>
  );
};

export default page;
