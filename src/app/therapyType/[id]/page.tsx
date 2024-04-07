import prisma from "@/db/client";
import TherapyTypeForm from "../components/TherapyTypeForm";
import { redirect } from "next/navigation";

interface  EditTherapyTypePageProps {
    params:{
        id:string
    }
}

const EditTherapyTypePage = async ({params}:EditTherapyTypePageProps) => {
    const data = await prisma.therapyType.findFirst({
        where: {
            id: params.id
        }
    })

    if (!data) redirect('/therapyType');
  return (
    <div>
      <TherapyTypeForm data = {data}/>
    </div>
  );
};

export default EditTherapyTypePage;
