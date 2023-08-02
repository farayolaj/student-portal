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
  publicKey?: string;
  sessionId?: string;
}

interface Payment {
  id: string;
  code?: string;
  title: string;
  amount: number;
  dueDate: Date;
  isActive: boolean;
  status: "paid" | "unpaid";
  level?: string;
  entryMode?: string;
  programme?: string;
  sessionId?: string;
  semester?: string;
  containsPreselected: boolean;
  paymentType: "sundry" | "main";
  transactionType?: "normal" | "custom";
  transactionRef?: string;
  preselected?: {
    id: string;
    title: string;
    amount: number;
  };
  prerequisites: {
    id: string;
    description: string;
    isPaid: boolean;
  }[];
  transaction?: Transaction;
}

interface PortalDocument {
  id: string;
  title: string;
  url: string;
  fileType: string;
  prerequisite?: {
    name: string;
    hasPaid: boolean;
  };
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
  isVerified: boolean;
}

interface AcademicProfile {
  id: string;
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
  course: {
    id: Course["id"];
    title: Course["title"];
    code: Course["code"];
    status: Course["status"];
    semester: Course["semester"];
    units: Course["units"];
  };
  details: {
    centre: string;
    location: string;
    time: string;
    /** Can be a url too */
    category?: string;
    sessionId?: string;
    batch?: string;
    description?: string;
    date: Date;
  };
}

/**
 * A mapping of events to dates.
 */
interface EventDateMapping {
  [key: string]: CalendarEvent[];
}

interface ResultVerificationDocumentType {
  id: string;
  name: string;
  description?: string;
  customName?: string;
}

interface ResultVerificationResult {
  status: "verified" | "not-verified" | "pending";
  remarks: {
    comment: string;
    dateCreated: Date;
  }[];
}

interface DocumentUploadValue {
  id: string;
  existingId?: string;
  documentTypeId: string;
  file: File | null;
  customTitle?: string;
}

interface DocumentUpload {
  id: string;
  documentType?: string;
  documentTypeId?: string;
  file: string;
  customTitle?: string;
  reason?: string;
}

interface MinimalMessage {
  id: string;
}

interface Message extends MinimalMessage {
  from: string;
  subject: string;
  date: Date;
  snippet: string;
  htmlContent: string;
  plainContent: string;
  attachments: MinimalAttachment[];
}

interface MinimalAttachment {
  id: string;
  size: number;
  filename: string;
  mimeType: string;
}

interface Attachment extends MinimalAttachment {
  data: Buffer | null;
}
