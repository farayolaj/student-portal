export const toCourse = (course: any) =>
  ({
    id: course.main_course_id,
    code: course.course_code,
    title: course.course_title,
    description: course.description,
    status: course.course_enrollment_status,
    semester: parseInt(course.course_enrollment_semester),
    units: parseInt(course.course_enrollment_unit),
    materialLink: course.course_guide_url || undefined,
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
    totalUnits: parseInt(stat.total_unit_registered),
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

export const fromPreloadToCourse = (course: any) =>
  ({
    id: course.course_id,
    code: course.code,
    title: course.title,
    // description: course.description,
    status: course.status,
    semester: parseInt(course.semester),
    units: parseInt(course.unit),
    materialLink: course.materialLink,
    lecturer: course.lecturer,
    preSelected: course.pre_select == 1,
  } as Course);
