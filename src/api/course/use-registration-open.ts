import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useRegistrationOpen = createQuery(
  "registration-open",
  async () => {
    const response = await getApi().get("/is_registration_open");

    return response.data.status as boolean;
  }
);
