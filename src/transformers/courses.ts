export const fromEnrollmenttoCourse = (course: any) =>
  ({
    id: course.main_course_id,
    code: course.course_code,
    title: course.course_title,
    description: course.description,
    status: course.course_enrollment_status,
    semester: parseInt(course.course_enrollment_semester),
    units: parseInt(course.course_enrollment_unit),
  } as Course);

export const fromDetailsToCourse = (course: any) =>
  ({
    id: course.id,
    code: course.code,
    title: course.title,
    description: course.description,
    materialLink: course.course_guide_url || undefined,
    semester: parseInt(course.active),
    units: parseInt(course.course_unit),
    status: course.course_status,
    lecturer: course.course_lecturer_id
      ? `${course.firstname} ${course.othernames} ${course.lastname}`.replace(
          "undefined",
          ""
        )
      : undefined,
  } as Course);

export const toCourseStatistics = (stat: any) =>
  ({
    maxUnits: parseInt(stat.max_unit),
    minUnits: parseInt(stat.min_unit),
    totalUnits: parseInt(stat.total_units_registered),
    totalCourses: parseInt(stat.total_registered),
  } as CourseStatistics);

export const toCourseConfig = (config: any) =>
  ({
    semester: parseInt(config.semester),
    readableSemester: config.semester_readable,
    minUnits: parseInt(config.min_unit),
    maxUnits: parseInt(config.max_unit),
    totalUnitsRegistered: parseInt(config.total_units_registered),
  } as CourseConfig);
