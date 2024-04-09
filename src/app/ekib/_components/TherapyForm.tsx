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
  initialData?: Therapy;
  therapyType: TherapyType[];
  therapyPlace: TherapyPlace[];
  TherapyUnvans: TherapyUnvan[];
}

interface CheckedTherapy {
  id: string;
  name: string;
}

const TherapyForm = ({
  initialData,
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

  const [checkedTherapyTypeValidation, setCheckedTherapyTypeValidation] =
    useState(false);
  const [checkedTherapyPlaceValidation, setCheckedTherapyPlaceValidation] =
    useState(false);
  const [checkedTherapyUnvanValidation, setCheckedTherapyUnvanValidation] =
    useState(false);

  const router = useRouter();

  const handleTypeCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, name, checked } = event.target;
    if (checked) {
      setCheckedTherapyType((prevTherapies) => [
        ...prevTherapies,
        { id: id, name: name },
      ]);
      setCheckedTherapyTypeValidation(false);
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
      setCheckedTherapyPlaceValidation(false);
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
      setCheckedTherapyUnvanValidation(false);
    } else {
      setCheckedTherapyUnvan((prevTherapies) =>
        prevTherapies.filter((therapy) => therapy.id !== id)
      );
    }
  };

  const onAction = async (formData: FormData) => {
    if (
      checkedTherapyType.length < 1 ||
      checkedTherapyPlace.length < 1 ||
      checkedTherapyUnvan.length < 1
    ) {
      if (checkedTherapyType.length < 1) {
        setCheckedTherapyTypeValidation(true);
      }
      if (checkedTherapyPlace.length < 1) {
        setCheckedTherapyPlaceValidation(true);
      }
      if (checkedTherapyUnvan.length < 1) {
        setCheckedTherapyUnvanValidation(true);
      }
      return null;
    }
    const name = formData.get("name");
    const egitim = formData.get("egitim");
    const lisans = formData.get("lisans");
    const yuksekLisans = formData.get("yuksekLisans");
    const terapiEgtim = formData.get("terapiEgtim");
    const uzmanAlan = formData.get("uzmanAlan");
    const summery = formData.get("summery");

    if (!name || name.toString().length == 0) {
      toast.error("Name is Required");
      return;
    }
    if (!summery || summery.toString().length == 0) {
      toast.error("Summary is Required");
      return;
    }

    const data = {
      name,
      egitim,
      lisans,
      yuksekLisans,
      terapiEgtim,
      uzmanAlan,
      summery,
      therapyTypes: checkedTherapyType,
      therapyPlaces: checkedTherapyPlace,
      therapyUnvans: checkedTherapyUnvan,
    };

    if (!initialData) {
      try {
        const res = await axios.post("/api/ekib", data);
        if (res.status == 200) {
          toast.success("Therapy Added Successfully");
          router.push("/ekib");
        }
      } catch (err) {
        console.log(err);
        toast.error("something went wrong");
      }
    }

    else {
      try {
        const res = await axios.patch(`/api/ekib/${initialData.id}`, data);
        if (res.status == 200) {
          toast.success("Therapy Updated Successfully");
          router.push("/ekib");
        }
      } catch (err) {
        console.log(err);
        toast.error("something went wrong");
      }
    }
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
            defaultValue={initialData?.name}
            placeholder="Terapinin adi (Required)"
          />
          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="egitim"
            defaultValue={initialData?.egitim ?? ""}
            placeholder="Eğitim"
          />
          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="lisans"
            defaultValue={initialData?.lisans ?? ""}
            placeholder="Lisans"
          />
          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="yuksekLisans"
            defaultValue={initialData?.yuksekLisans ?? ""}
            placeholder="Yuksek Lisans"
          />
          <textarea
            className="bg-slate-50 p-4 text-center h-24"
            name="terapiEgtim"
            defaultValue={initialData?.terapiEgtim ?? ""}
            placeholder="Terapi Eğitim  "
          />

          <input
            className="bg-slate-50 h-10 p-4 text-center"
            type="text"
            name="uzmanAlan"
            defaultValue={initialData?.uzmanAlan ?? ""}
            placeholder="Uzman Alanı"
          />
          {/* ............/ */}
          <div className="flex flex-col gap-4 items-center md:flex-row md:gap-10 md:justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-3">
                <p>Tür seç </p>

                {checkedTherapyTypeValidation ? (
                  <p className="text-red-600">Required</p>
                ) : (
                  <></>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-3 p-4">
                {therapyType.map((type, i) => (
                  <div key={type.id} className="flex items-center gap-5">
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
              <DropdownMenuTrigger className="flex gap-3">
                <p>Yer seç</p>

                {checkedTherapyPlaceValidation ? (
                  <p className="text-red-600">Required</p>
                ) : (
                  <></>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-3 p-4">
                {therapyPlace.map((type, i) => (
                  <div key={type.id} className="flex items-center gap-5">
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
              <DropdownMenuTrigger className="flex gap-3">
                <p>Unvan seç</p>

                {checkedTherapyUnvanValidation ? (
                  <p className="text-red-600">Required</p>
                ) : (
                  <></>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-3 p-4">
                {TherapyUnvans.map((type, i) => (
                  <div key={type.id} className="flex items-center gap-5">
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
            name="summery"
            defaultValue={initialData?.summery}
            placeholder="Özet (Required)"
            required
          />

          <div className="w-4/6 flex justify-start mx-auto">
            <SubmitButton />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default TherapyForm;
