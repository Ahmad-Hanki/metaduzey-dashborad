"use client";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
    type="submit"
      disabled={pending}
      className={cn("btn", pending ? "cursor-not-allowed" : "")}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
