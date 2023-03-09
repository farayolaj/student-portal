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

interface BasePayment {
  id: string;
  title: string;
  amount: number;
  dueDate?: Date;
  status: "paid" | "unpaid";
  type: "tuition" | "secondary" | "general" | "custom";
  transactions?: Transaction[];
}

interface TuitionPayment extends BasePayment {
  level: string;
  entryMode: string;
  programme: string;
  semester: string;
  session: string;
  type: "tuition";
}

interface SecondaryPayment extends BasePayment {
  session: string;
  programme: string;
  type: "secondary";
}

interface GeneralPayment extends BasePayment {
  type: "general";
}

interface CustomPayment extends BasePayment {
  session: string;
  semester: string;
  programme: string;
  level: string;
  type: "custom";
}

type Payment =
  | TuitionPayment
  | SecondaryPayment
  | GeneralPayment
  | CustomPayment;

interface PortalDocument {
  id: string;
  title: string;
  url: string;
  fileType: string;
  programme?: string;
  session?: string;
  semester?: string;
}
