import { createMutation } from "react-query-kit";
import getApi from "../api";

export const useUpdateProfileImage = createMutation(
  async ({ file }: { file: File }) => {
    const formData = new FormData();
    formData.append("student_passprt", file);

    const response = await getApi().post("/student_upload_passport", formData);

    if (!response.data.status) {
      throw new Error(response.data.message);
    }

    return;
  }
);
