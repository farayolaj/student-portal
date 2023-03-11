import { getAllSessions } from "../../api/courses";
import { createQueryHelper } from "../../lib/create-query-helper";

export const useAllSessions = createQueryHelper("all-sessions", getAllSessions);
