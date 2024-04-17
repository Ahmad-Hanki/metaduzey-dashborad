"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface ToggleSwitchProps {
  id: string;
  checked:boolean
}

const ToggleSwitch = ({ id, checked }: ToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    const res = await axios.patch("/api/contact", {
      id,
      checked,
    });

    if (res.status == 200) {
      toast.success('Client was contacted with successfully');
    } else {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-2 w-full h-full p-2",
        !isChecked ? "bg-transparent" : ""
      )}
    >
      <input
        type="checkbox"
        id="terms"
        checked={isChecked}
        onChange={handleChange}

      />
    </div>
  );
};

export default ToggleSwitch;
