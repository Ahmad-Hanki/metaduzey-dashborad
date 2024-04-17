import Hero from "@/components/Hero";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user?.email != "itxti909@gmail.com") redirect("/api/auth/logout");
  return (
    <main >
      <Hero />
    </main>
  );
}
