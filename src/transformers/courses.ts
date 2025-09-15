/* eslint-disable @typescript-eslint/no-explicit-any */
export const toCourse = (course: any) =>
  ({
    id: course.main_course_id,
    code: course.course_code || course.code,
    title: course.course_title || course.title,
    description: course.description,
    status: course.course_enrollment_status || course.course_status,
    semester: parseInt(course.course_enrollment_semester || course.semester),
    units: parseInt(course.course_enrollment_unit || course.course_unit),
    materialLink: course.course_guide_url || undefined,
    courseGuideUrl: course.course_guide,
    lecturer:
      course.firstname || course.lastname
        ? `${course.firstname} ${course.othernames} ${course.lastname}`
            .replace("undefined", "")
            .replace("null", "")
        : undefined,
    preSelected: course.pre_select ? course.pre_select == 1 : undefined,
    courseRoomUrl: course.course_room_url || null,
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
