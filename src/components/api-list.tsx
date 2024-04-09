"use client";

import { useOrigin } from "@/hooks/useOrigin";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "./api-alert"; 

type Props = {
  entityName: string;
  entityIdName: string;
};

const ApiList = ({ entityIdName, entityName }: Props) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api`;

  return (
    <>
      <ApiAlert
        description={`${baseUrl}/${entityName}`}
        title="GET"
        variant="public"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="GET"
        variant="public"
      />
    </>
  );
};

export default ApiList;
