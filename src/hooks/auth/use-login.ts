import { createMutation } from "react-query-kit";
import { login } from "../../api/auth";

export const useLogin = createMutation(login);
