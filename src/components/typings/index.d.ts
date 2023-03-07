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

interface BasePayment {
  id: string;
  title: string;
  amount: number;
  dueDate?: Date;
  status: "paid" | "unpaid" | "partial";
  type: "tuition" | "secondary" | "general" | "custom";
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
  type: "custom";
}

type Payment =
  | TuitionPayment
  | SecondaryPayment
  | GeneralPayment
  | CustomPayment;
