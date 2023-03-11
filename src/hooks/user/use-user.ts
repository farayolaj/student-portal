import { getUser } from "../../api/user";
import { createQueryHelper } from "../../lib/create-query-helper";

export const useUser = createQueryHelper("user", getUser);
