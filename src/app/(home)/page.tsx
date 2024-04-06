import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user?.email != "itxti909@gmail.com") redirect("/api/auth/logout");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  );
}
