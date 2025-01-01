import { createMutation } from "react-query-kit";
import getApi from "../api";

async function registerForFreeAccess({ phoneNumber }: { phoneNumber: string }) {
  const response = await getApi().post("/telco_number", {
    telco_number: phoneNumber,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export const useFreeAccessReg = createMutation(registerForFreeAccess);
