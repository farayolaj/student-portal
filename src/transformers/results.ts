/* eslint-disable @typescript-eslint/no-explicit-any */
export function toResultSession(data: any) {
  return {
    id: data.exam_session_id,
    name: data.exam_session,
  } as ResultSession;
}

export function toResult(session: ResultSession, payload: any) {
  const result: Result = {
    session: session,
    printUrl: payload.print_url || "",
    ...groupCourseResultBySemester(payload.data?.map(toCourseResult) || []),
  };

  return result;
}

function toCourseResult(data: any) {
  return {
    id: data.course_enrollment_course_id,
    code: data.course_code,
    title: data.course_title,
    units: parseInt(data.course_enrollment_unit) || 0,
    semester: parseInt(data.course_enrollment_semester) || 0,
    status: data.course_enrollment_status,
    totalScore: parseFloat(data.total_score) || 0,
    caScore: parseFloat(data.ca_score) || 0,
    examScore: parseFloat(data.exam_score) || 0,
    grade: parseInt(data.grade) || 0,
    remark: data.remark,
  } as CourseResult;
}

function groupCourseResultBySemester(results: CourseResult[]) {
  const firstSemesterResults: CourseResult[] = [];
  const secondSemesterResults: CourseResult[] = [];
  let firstSemesterTotalUnits = 0;
  let secondSemesterTotalUnits = 0;
  let firstSemesterPassedUnits = 0;
  let secondSemesterPassedUnits = 0;

  results.forEach((result) => {
    if (result.semester === 1) {
      firstSemesterResults.push(result);
      firstSemesterTotalUnits += result.units;
      firstSemesterPassedUnits += result.remark === "pass" ? result.units : 0;
    } else {
      secondSemesterResults.push(result);
      secondSemesterTotalUnits += result.units;
      secondSemesterPassedUnits += result.remark === "pass" ? result.units : 0;
    }
  });

  const firstSemester: SemesterResult = {
    courses: firstSemesterResults,
    unitsPassed: firstSemesterPassedUnits,
    unitsRegistered: firstSemesterTotalUnits,
  };
  const secondSemester: SemesterResult = {
    courses: secondSemesterResults,
    unitsPassed: secondSemesterPassedUnits,
    unitsRegistered: secondSemesterTotalUnits,
  };

  return { firstSemester, secondSemester };
}

export function toSessionResultStats(data: any) {
  return {
    cgpa: data.cgpa,
    gpa: data.gpa,
    tcu: data.tcu,
    twgp: data.twgp,
  } as SessionResultStats;
}

export function toSessionResultSummary(data: any) {
  return {
    session: {
      id: data.session_id,
      name: data.name,
    },
    results: data.result.map(toResultSummary),
  } as SessionResultSummary;
}

export function toResultSummary(data: any) {
  return {
    courseCode: data.course_code,
    units: parseInt(data.course_enrollment_unit),
    totalScore: parseInt(data.total_score),
    remark: data.remark,
  } as ResultSummary;
}
