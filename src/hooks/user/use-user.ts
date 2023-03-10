import { createMutation } from "react-query-kit";
import { getUser } from "../../api/user";

export const useUser = createMutation(getUser);
