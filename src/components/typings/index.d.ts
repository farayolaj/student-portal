interface Course {
  id: string;
  title: string;
  description: string;
  lecturer: string;
  image: string;
  semester: number;
  units: number;
  /**
   * Whether course is required or compulsory or elective
   */
  status: string;
  materialLink: string;
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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  matricNumber: string;
}
