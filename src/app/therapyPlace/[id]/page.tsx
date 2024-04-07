import prisma from "@/db/client";
import { redirect } from "next/navigation";
import TherapyPlaceForm from "../components/TherapyPlaceForm";

interface  EditTherapyTypePageProps {
    params:{
        id:string
    }
}

const EditTherapyTypePage = async ({params}:EditTherapyTypePageProps) => {
    const data = await prisma.therapyPlace.findFirst({
        where: {
            id: params.id
        }
    })

    if (!data) redirect('/therapyPlace');
  return (
    <div>
      <TherapyPlaceForm data = {data}/>
    </div>
  );
};

export default EditTherapyTypePage;
