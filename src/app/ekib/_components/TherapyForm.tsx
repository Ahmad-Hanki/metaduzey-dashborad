"use client";

import Container from "@/components/Container";
import SubmitButton from "@/components/SubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Therapy,
  TherapyPlace,
  TherapyType,
  TherapyUnvan,
} from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangeEvent, useState } from "react";
interface TherapyFormProps {
  data?: Therapy;
  therapyType: TherapyType[];
  therapyPlace: TherapyPlace[];
  TherapyUnvans: TherapyUnvan[];
}

interface CheckedTherapy {
  id: string;
  name: string;
}

const TherapyForm = ({
  data,
  therapyType,
  TherapyUnvans,
  therapyPlace,
}: TherapyFormProps) => {
  const [checkedTherapyType, setCheckedTherapyType] = useState<
    CheckedTherapy[]
  >([]);
  const [checkedTherapyPlace, setCheckedTherapyPlace] = useState<
    CheckedTherapy[]
  >([]);
  const [checkedTherapyUnvan, setCheckedTherapyUnvan] = useState<
    CheckedTherapy[]
  >([]);

  const router = useRouter();

  const handleTypeCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, name, checked } = event.target;
    if (checked) {
      setCheckedTherapyType((prevTherapies) => [
        ...prevTherapies,
        { id: id, name: name },
      ]);
    } else {
      setCheckedTherapyType((prevTherapies) =>
        prevTherapies.filter((therapy) => therapy.id !== id)
      );
    }
  };

  const handlePlaceCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, name, checked } = event.target;
    if (checked) {
      setCheckedTherapyPlace((prevTherapies) => [
        ...prevTherapies,
        { id: id, name: name },
      ]);
    } else {
      setCheckedTherapyPlace((prevTherapies) =>
        prevTherapies.filter((therapy) => therapy.id !== id)
      );
    }
  };

  const handleUnvanCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, name, checked } = event.target;
    if (checked) {
      setCheckedTherapyUnvan((prevTherapies) => [
        ...prevTherapies,
        { id: id, name: name },
      ]);
    } else {
      setCheckedTherapyUnvan((prevTherapies) =>
        prevTherapies.filter((therapy) => therapy.id !== id)
      );
    }
  };

  const onAction = async (formData: FormData) => {
    // const name = formData.get("name");
    // if (!name || name.toString().length == 0) return;
    // if (!data) {
    //   const res = await axios.post("/api/ekib", { name });
    //   const status = res.status;
    //   if (status != 200) {
    //     const message = await res.data.err;
    //     toast.error(message);
    //   } else {
    //     toast.success("terapi eklendi");
    //     router.refresh();
    //     router.push("/ekib");
    //   }
    // } else {
    //   const res = await axios.patch(`/api/ekib/${data.id}`, { name });
    //   const status = res.status;
    //   if (status != 200) {
    //     const message = await res.data.err;
    //     toast.error(message);
    //   } else {
    //     toast.success("terapi duzenlendi");
    //     router.refresh();
    //     router.push("/ekib");
    //   }
    // }

    console.log(checkedTherapyType);
    console.log(checkedTherapyPlace);
    console.log(checkedTherapyUnvan);
  };

  return (
    <div className="bg-slate-200">
      <Container>
        <form action={onAction} className="grid grid-cols-1 gap-5">
          <input
            className="bg-slate-50 h-10 p-4 text-center"
            type="text"
            name="name"
            required
            defaultValue={data?.name}
            placeholder="Terapinin adi"
          />
          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="egitim"
            defaultValue={data?.egitim??''}
            placeholder="Eğitim  "
          />
          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="Lisans"
            defaultValue={data?.Lisans??''}
            placeholder="Lisans  "
          />
          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="YuksekLisans"
            defaultValue={data?.YuksekLisans??''}
            placeholder="YuksekLisans  "
          />
          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="TerapiEgtim"
            defaultValue={data?.TerapiEgtim??''}
            placeholder="TerapiEgtim  "
          />

          <input
            className="bg-slate-50 h-10 p-4 text-center"
            type="text"
            name="UzmanAlan"
            defaultValue={data?.UzmanAlan??''}
            placeholder="UzmanAlan"
          />
          {/* ............/ */}
          <div className="flex flex-col gap-4 items-center md:flex-row md:gap-10 md:justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger>Tür seç</DropdownMenuTrigger>
              <DropdownMenuContent>
                {therapyType.map((type, i) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={type.id}
                      value={type.id}
                      name={type.name}
                      onChange={handleTypeCheckboxChange}
                      checked={checkedTherapyType.some(
                        (therapy) => therapy.id === type.id
                      )}
                    />

                    <label
                      htmlFor={type.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.name}
                    </label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>Yer seç</DropdownMenuTrigger>
              <DropdownMenuContent>
                {therapyPlace.map((type, i) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={type.id}
                      value={type.id}
                      name={type.name}
                      onChange={handlePlaceCheckboxChange}
                      checked={checkedTherapyPlace.some(
                        (therapy) => therapy.id === type.id
                      )}
                    />

                    <label
                      htmlFor={type.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.name}
                    </label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>Unvan seç</DropdownMenuTrigger>
              <DropdownMenuContent>
                {TherapyUnvans.map((type, i) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={type.id}
                      value={type.id}
                      name={type.name}
                      onChange={handleUnvanCheckboxChange}
                      checked={checkedTherapyUnvan.some(
                        (therapy) => therapy.id === type.id
                      )}
                    />

                    <label
                      htmlFor={type.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type.name}
                    </label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="summary"
            defaultValue={data?.Summery}
            placeholder="Özet"
          />


          {/*             //////// */}
          <div className="w-4/6 flex justify-start mx-auto">
            <SubmitButton />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default TherapyForm;
