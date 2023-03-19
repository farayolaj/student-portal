import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useRegistrationOpen = createQuery<boolean, { semester: number }>(
  "registration-open",
  async ({ queryKey: [_, { semester }] }) => {
    const semesterString = semester === 2 ? "second" : "first";
    const response = await getApi().get(
      `/is_registration_open?semester=${semesterString}`
    );

    return response.data.status as boolean;
  }
);
