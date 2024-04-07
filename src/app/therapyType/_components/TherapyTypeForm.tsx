"use client";

import Container from "@/components/Container";
import SubmitButton from "@/components/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TherapyType } from "@prisma/client";
interface TherapyTypeFormProps {
  data?: TherapyType;
}
const TherapyTypeForm = ({ data }: TherapyTypeFormProps) => {
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
    <div className="bg-slate-200">
      <Container>
        <form
          action={onAction}
          className="flex flex-col gap-4 items-center w-full"
        >
          <div className="flex-col flex gap-4 w-full justify-center items-center ">
            <label htmlFor="name">Terapi Tür</label>
            <input
              className="bg-slate-400 w-52 h-10 md:w-60 xl:w-80 p-4"
              type="text"
              name="name"
              required
              defaultValue={data?.name}
            />
          </div>

          <div>
            <SubmitButton />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default TherapyTypeForm;
