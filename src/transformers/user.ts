import parse from "date-fns/parse";

export const toUser = (user: any) =>
  ({
    email: user.user_login || user.alternative_email,
    firstName: user.firstname,
    otherNames: user.othernames,
    lastName: user.lastname,
    matricNumber: user.reg_num,
    dob: parse(user.DoB, "dd/MM/yyyy", new Date()),
    gender: user.gender,
    phone: user.phone,
  } as User);
