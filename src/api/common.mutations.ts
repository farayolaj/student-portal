import getApi from "./api";

export async function registerForFreeAccess({
  phoneNumber,
}: {
  phoneNumber: string;
}) {
  const response = await getApi().post("/telco_number", {
    telco_number: phoneNumber,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export async function submitLMSSurvey({
  attendance,
}: {
  attendance: AttendanceOptions;
}) {
  const response = await getApi().post("/orientation_attendance", {
    attendance_type: attendance,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}
