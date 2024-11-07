import { createMutation } from "react-query-kit";
import getApi from "../api";

async function submitLMSSurvey({
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

export const useLMSSurveyMutation = createMutation(submitLMSSurvey);
