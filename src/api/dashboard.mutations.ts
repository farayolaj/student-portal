import getApi from "./api";

type useBiodataUpdateProps = {
  next_of_kin: string;
  next_of_kin_phone: string;
  next_of_kin_addr: string;
  gender: string;
  dob: string;
  disabilities: string[];
};

export async function updateBiodata({
  next_of_kin,
  next_of_kin_phone,
  next_of_kin_addr,
  gender,
  dob,
  disabilities,
}: useBiodataUpdateProps) {
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

type UsePracticumRequestProps = {
  schoolContact: string;
  schoolName: string;
  schoolLocationDesc: string;
  schoolState: string;
  schoolCity: string;
  schoolLGA: string;
  schoolPhone: string;
};

export async function requestPracticum({
  schoolContact,
  schoolName,
  schoolCity,
  schoolLGA,
  schoolLocationDesc,
  schoolPhone,
  schoolState,
}: UsePracticumRequestProps) {
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
