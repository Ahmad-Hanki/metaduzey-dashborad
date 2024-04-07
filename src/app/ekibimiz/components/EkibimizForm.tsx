"use client";

import Container from "@/components/Container";
import SubmitButton from "@/components/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TherapyType } from "@prisma/client";
interface EkibibmizFormProps {
  data?: TherapyType;
}
const EkibibmizForm = async ({ data }: EkibibmizFormProps) => {
  const router = useRouter();
  const onAction = async (formData: FormData) => {
    const name = formData.get("name");
    if (!name || name.toString().length == 0) return;
    if (!data) {
      const res = await axios.post("/api/therapyType", { name });
      const status = res.status;
      if (status != 200) {
        const message = await res.data.err;
        toast.error(message);
      } else {
        toast.success("terapi eklendi");
        router.refresh();
        router.push("/therapyType");
      }
    } else {
      const res = await axios.patch(`/api/therapyType/${data.id}`, { name });
      const status = res.status;
      if (status != 200) {
        const message = await res.data.err;
        toast.error(message);
      } else {
        toast.success("terapi duzenlendi");
        router.refresh();
        router.push("/therapyType");
      }
    }
  };

  return (
    <div className="">
      <Container>
        <form
          action={onAction}
          className="grid grid-cols-1 gap-5 justify-center items-center p-5"
        >
          <input
            className="bg-zinc-200 p-4 text-black"
            type="text"
            name="name"
            required
            defaultValue={data?.name}
            placeholder="Adiniz"
          />

          <textarea
            required
            placeholder="Lisans"
            minLength={4}
            name="Lisans"
            className="bg-zinc-200  p-4 h-28"
          />
          <textarea
            required
            placeholder="YuksekLisans"
            minLength={4}
            name="YuksekLisans"
            className="bg-zinc-200  p-4 h-28"
          />
          <div>
            <SubmitButton />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EkibibmizForm;
