import { createMutation } from "react-query-kit";
import { resetPassword } from "../../api/auth";

export const usePasswordReset = createMutation(resetPassword);
