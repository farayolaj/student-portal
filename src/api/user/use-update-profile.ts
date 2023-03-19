import { createMutation } from "react-query-kit";
import getApi from "../api";

export const useUpdateProfile = createMutation(
  async ({
    alternativeEmail,
    phone,
  }: {
    alternativeEmail?: string;
    phone?: string;
  }) => {
    const data: Record<string, string> = {};

    if (alternativeEmail) data.alternative_mail = alternativeEmail;
    if (phone) data.phone = phone;

    const response = await getApi().post("/profile", data);

    if (!response.data.status) {
      throw new Error(response.data.message);
    }

    return;
  }
);
