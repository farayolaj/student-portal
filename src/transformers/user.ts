import parse from "date-fns/parse";
import resolveProfileImageUrl from "../lib/resolve-profile-image-url";

export const toUser = (user: any) =>
  ({
    email: user.user_login || user.alternative_email,
    firstName: user.firstname,
    otherNames: user.othernames,
    lastName: user.lastname,
    profileImage: user.passport && resolveProfileImageUrl(user.passport),
    matricNumber: user.matric_number || "",
    dob: parse(user.DoB, "dd/MM/yyyy", new Date()),
    gender: user.gender,
    phone: user.phone,
    currentSessionId: user.current_session,
    currentSemester: parseInt(user.current_semester),
  } as User);
