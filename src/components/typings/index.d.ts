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
