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

type Result = {
  id: string;
  session: string;
  semester: string;
  gpa: number;
  unitsRegistered: number;
  unitsPassed: number;
  courses: CourseResult[];
};
