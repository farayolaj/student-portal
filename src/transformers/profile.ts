/* eslint-disable @typescript-eslint/no-explicit-any */
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

function isFresher(name: string, level: string) {
  const olevel = "O' Level";
  const olevelPutme = "O' Level Putme";
  const directEntry = "Direct Entry";
  const fastTrack = "Fast Track";
  if (
    (name == directEntry && level == "2") ||
    (name === olevel && level === "1") ||
    (name == olevelPutme && level == "1") ||
    (name == fastTrack && level == "2")
  ) {
    return true;
  }
  return false;
}

export const toUser = (user: any) =>
  ({
    email: user.user_login,
    firstName: user.firstname,
    otherNames: user.othernames,
    lastName: user.lastname,
    profileImage: studentImagePathUrl(user.passport),
    dob: parse(user.DoB, "dd/MM/yyyy", new Date()),
    dob_new: parse(user.DoB, "yyyy-mm-dd", new Date()),
    gender: user.gender,
    phone: user.phone,
    alternativeEmail: user.alternative_email,
    currentSessionId: user.current_session,
    currentSemester: parseInt(user.current_semester),
    isVerified: user.is_verified === "1",
    hasPaidOlevelVerification: user.has_paid_olevel_verification,
    isFresher: isFresher(
      user.academicRecord?.entry_mode,
      user.programmeDetails?.level
    ),
    orientationAttendance: user.orientation_attendance,
    orientationAttendanceDate: user.orientation_attendance_date,
    has_upload_verification_doc: user.has_upload_verification_doc,
    orientationSeatNo: user.orientation_seat_no || undefined,
    telcoNumber: user.telco_number,
    isFinalist: user.is_finalist,
    isExtraYear: user.is_extraYear,
    universityRoomUrl: user.university_room_url,
  } as User);

export const toAcademicProfile = (profile: any) =>
  ({
    id: profile.academicRecord.student_id,
    matricNumber: profile.academicRecord.matric_number,
    entryMode: profile.academicRecord.entry_mode,
    programme: profile.programmeDetails?.programme,
    department: profile.programmeDetails?.department,
    faculty: profile.programmeDetails?.faculty,
    level: profile.academicRecord?.current_level,
    examCenter: profile.academicRecord.exam_center,
  } as AcademicProfile);

export const toProfile = (profile: any) =>
  ({
    user: toUser(profile),
    academicProfile: toAcademicProfile(profile),
  } as Profile);
