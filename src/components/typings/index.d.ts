interface DashboardInfo {
  user: User;
  programme: Programme;
  courses: Course[];
  cpga: number;
}

interface Programme {
  entryMode: string;
  entrySession: string;
  level: string;
  currentSession: string;
  currentSessionId: string;
  department: string;
  programme: string;
  faculty: string;
  modeOfStudy: string | null;
  examCentre: string;
}

interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  lecturer?: string;
  /**
   * C: Completed
   * E: Enrolled
   * R: Registered
   */
  status: "C" | "E" | "R";
  semester: number;
  units: number;
  materialLink?: string;
  preSelected?: boolean;
}

interface CourseStatistics {
  minUnits: number;
  maxUnits: number;
  totalUnits: number;
  totalCourses: number;
}

interface CourseConfig {
  semester: number;
  readableSemester: string;
  minUnits: number;
  maxUnits: number;
  totalUnitsRegistered?: number;
}

interface SessionResultSummary {
  session: ResultSession;
  results: ResultSummary[];
}

interface ResultSummary {
  courseCode: string;
  units: number;
  totalScore: number;
  remark: "pass" | "fail";
}

interface ResultSession {
  id: string;
  name: string;
}

interface CourseResult {
  id: string;
  code: string;
  title: string;
  status: "C" | "E" | "R";
  caScore: number;
  examScore: number;
  totalScore: number;
  semester: number;
  grade: number;
  units: number;
  remark: "pass" | "fail";
}

interface SemesterResult {
  unitsRegistered: number;
  unitsPassed: number;
  courses: CourseResult[];
}

interface Result {
  session: ResultSession;
  printUrl: string;
  firstSemester: SemesterResult;
  secondSemester: SemesterResult;
}

interface SessionResultStats {
  tcu: number;
  twgp: number;
  gpa: number;
  cgpa: number;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  referenceNumber: string;
  rrr: string;
  dateInitiated: Date;
  status: "failed" | "pending" | "success";
  datePayed?: Date;
}

interface Payment {
  id: string;
  title: string;
  amount: number;
  dueDate?: Date;
  status: "paid" | "unpaid";
  level?: string;
  entryMode: string;
  programme: string;
  session?: string;
  semester?: string;
  transactions?: Transaction[];
}

interface PortalDocument {
  id: string;
  title: string;
  url: string;
  fileType: string;
  programme?: string;
  session?: string;
  semester?: string;
}

interface User {
  firstName: string;
  otherNames?: string;
  lastName: string;
  email: string;
  profileImage?: string;
  gender: string;
  dob: Date;
  phone: string;
  alternativeEmail?: string;
  currentSessionId: string;
  currentSemester: number;
}

interface AcademicProfile {
  matricNumber: string;
  level: string;
  entryMode: string;
  programme: string;
  department: string;
  faculty: string;
  examCenter: string;
}

interface Profile {
  user: User;
  academicProfile: AcademicProfile;
}

interface Session {
  id: string;
  name: string;
  level: number;
}

interface CalendarEvent {
  id: string;
  name: string;
  startTime?: string;
  endTime?: string;
  date: Date;
  location?: string;
  centre?: string;
  /**
   * For events that apply to students in batches.
   */
  batch?: string;
  category?: string;
}

/**
 * A mapping of events to dates.
 */
interface EventDateMapping {
  [key: string]: CalendarEvent[];
}
