const statusCodeNameMapping: Record<Course["status"], string> = {
  R: "Required",
  E: "Elective",
  C: "Compulsory",
};

export default function statusCodeToName(code: Course["status"]) {
  return statusCodeNameMapping[code];
}
