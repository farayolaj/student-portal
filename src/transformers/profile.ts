import parse from "date-fns/parse";

const IMAGE_SERVER = "https://dlcoffice.ui.edu.ng";

/**
 * This function should be redundant cose the server should be sending the full image url. Consider removing it.
 */
function studentImagePathUrl(name: string) {
  if (!name) return null;

  if (name.includes("http")) return name;

  const pathName = name.includes("assets")
    ? `${IMAGE_SERVER}/${name}`
    : `${IMAGE_SERVER}/assets/images/student/passports/${name}`;
  return pathName;
}

export const toUser = (user: any) =>
  ({
    email: user.user_login,
    firstName: user.firstname,
    otherNames: user.othernames,
    lastName: user.lastname,
    profileImage: studentImagePathUrl(user.passport),
    dob: parse(user.DoB, "dd/MM/yyyy", new Date()),
    gender: user.gender,
    phone: user.phone,
    alternativeEmail: user.alternative_email,
    currentSessionId: user.current_session,
    currentSemester: parseInt(user.current_semester),
    isVerified: user.is_verified === "1",
  } as User);

export const toAcademicProfile = (profile: any) =>
  ({
    id: profile.academicRecord.student_id,
    matricNumber: profile.academicRecord.matric_number,
    entryMode: profile.academicRecord.entry_mode,
    programme: profile.programmeDetails?.programme,
    department: profile.programmeDetails?.department,
    faculty: profile.programmeDetails?.faculty,
    level: profile.programmeDetails?.level,
    examCenter: profile.academicRecord.exam_center,
  } as AcademicProfile);

export const toProfile = (profile: any) =>
  ({
    user: toUser(profile),
    academicProfile: toAcademicProfile(profile),
  } as Profile);
