import { toCourse } from "./courses";
import { toUser } from "./profile";

export const toDashboardInfo = (data: any) =>
  ({
    user: toUser(data.bioData),
    courses: data.registered_course.map(toCourse) as Course[],
    cpga: parseFloat(data.cpga),
    programme: toProgramme({
      exam_center: data.bioData.exam_center,
      ...data.programmeDetails,
    }),
  } as DashboardInfo);

export const toProgramme = (programme: any) =>
  ({
    currentSession: programme.current_session,
    currentSessionId: programme.current_session_id,
    department: programme.department,
    entryMode: programme.entry_mode,
    entrySession: programme.entry_year,
    faculty: programme.faculty,
    level: programme.level,
    modeOfStudy: programme.mode_of_study,
    programme: programme.programme,
    examCentre: programme.exam_center,
  } as Programme);

export const toSession = (session: any) =>
  ({
    id: session.id,
    name: session.date,
  } as Session);
