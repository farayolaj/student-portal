import { createMutation } from "react-query-kit";
import getApi from "../api";

type UsePracticumRequestProps = {
  schoolContact: string;
  schoolName: string;
  schoolLocationDesc: string;
  schoolState: string;
  schoolCity: string;
  schoolLGA: string;
  schoolPhone: string;
};

export const usePracticumRequestForm = createMutation(
  async ({
    schoolContact,
    schoolName,
    schoolCity,
    schoolLGA,
    schoolLocationDesc,
    schoolPhone,
    schoolState,
  }: UsePracticumRequestProps) => {
    const data = {
      sch_contact_addr: schoolContact,
      school_location_desc: schoolLocationDesc,
      school_city: schoolCity,
      school_lga: schoolLGA,
      school_state: schoolState,
      school_name: schoolName,
      school_phone: schoolPhone,
    };

    const response = await getApi().post("/practicum_request_form", data);

    if (!response.data.status) throw new Error(response.data.message);
    return;
  }
);
