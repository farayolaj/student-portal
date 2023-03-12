import { createQuery } from "react-query-kit";
import api from "../api";

export const useRegistrationOpen = createQuery(
  "registration-open",
  async () => {
    const response = await api.get("/is_registration_open");

    return response.data.status as boolean;
  }
);
