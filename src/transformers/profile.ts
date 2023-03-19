import parse from "date-fns/parse";
import resolveProfileImageUrl from "../lib/resolve-profile-image-url";

export const toUser = (user: any) =>
  ({
    email: user.user_login,
    firstName: user.firstname,
    otherNames: user.othernames,
    lastName: user.lastname,
    profileImage: user.passport && resolveProfileImageUrl(user.passport),
    dob: parse(user.DoB, "dd/MM/yyyy", new Date()),
    gender: user.gender,
    phone: user.phone,
    alternativeEmail: user.alternative_email,
    currentSessionId: user.current_session,
    currentSemester: parseInt(user.current_semester),
  } as User);

export const toAcademicProfile = (profile: any) =>
  ({
    matricNumber: profile.matric_number,
    entryMode: profile.entry_mode,
    programme: profile.programme,
    department: profile.department,
    faculty: profile.faculty,
    level: profile.current_level + "00",
    examCenter: profile.exam_center,
  } as AcademicProfile);

export const toProfile = (profile: any) =>
  ({
    user: toUser(profile),
    academicProfile: toAcademicProfile(profile.academicRecord),
  } as Profile);
