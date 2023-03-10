import { toCourse } from "./courses";
import { toUser } from "./user";

export const toDashboardInfo = (data: any) =>
  ({
    user: toUser(data.biodata),
    courses: data.courses.map(toCourse) as Course[],
    cpga: parseFloat(data.cpga),
    programme: toProgramme(data.programme),
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
  } as Programme);

export const toSession = (session: any) =>
  ({
    id: session.id,
    name: session.date,
    level: parseInt(session.level),
  } as Session);
