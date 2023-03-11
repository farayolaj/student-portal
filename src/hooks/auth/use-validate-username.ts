import { createMutation } from "react-query-kit";
import { validateUsername } from "../../api/auth";

export const useValidateUsername = createMutation(validateUsername);
