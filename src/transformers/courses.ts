export const toCourse = (course: any) =>
  ({
    id: course.main_course_id,
    code: course.course_code,
    title: course.course_title,
    description: course.description,
    status: course.course_enrollment_status,
    semester: parseInt(course.course_enrollment_semester),
    units: parseInt(course.course_enrollment_unit),
  } as Course);

export const toCourseStatistics = (stat: any) =>
  ({
    ...stat,
  } as CourseStatistics);
