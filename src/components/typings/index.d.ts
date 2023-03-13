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

interface CourseResult {
  id: string;
  title: string;
  status: string;
  marks: number;
  gp: number;
  units: number;
}

interface SemesterResult {
  unitsRegistered: number;
  unitsPassed: number;
  courses: CourseResult[];
}

interface Result {
  id: string;
  session: string;
  firstSemester: SemesterResult;
  secondSemester: SemesterResult;
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
  matricNumber: string;
  gender: string;
  dob: Date;
  phone: string;
  sessionId: string;
}

interface Session {
  id: string;
  name: string;
  level: number;
}
