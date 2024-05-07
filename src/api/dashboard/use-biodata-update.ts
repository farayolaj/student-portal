import { createMutation } from "react-query-kit";
import getApi from "../api";

type useBiodataUpdateProps = {
  next_of_kin: string;
  next_of_kin_phone: string;
  next_of_kin_addr: string;
  gender: string;
  dob: string;
  disabilities: string[];
};

export const useBiodataUpdate = createMutation(
  async ({
    next_of_kin,
    next_of_kin_phone,
    next_of_kin_addr,
    gender,
    dob,
    disabilities,
  }: useBiodataUpdateProps) => {
    const data = {
      next_of_kin: next_of_kin,
      next_of_kin_phone: next_of_kin_phone,
      next_of_kin_addr: next_of_kin_addr,
      gender: gender,
      dob: dob,
      disabilities: disabilities,
    };

    const response = await getApi().post("/student_update_form", data);

    if (!response.data.status) throw new Error(response.data.message);
    return;
  }
);
