"use client";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";


const SubmitButton = ({submit ='Submit', submitting ='Submitting...'}: {submit?:string, submitting?:string}) => {
  const { pending } = useFormStatus();
  return (
    <button
    type="submit"
      disabled={pending}
      className={cn("btn w-36", pending ? "cursor-not-allowed" : "")}
    >
      {pending ? submitting : submit}
    </button>
  );
};

export default SubmitButton;
