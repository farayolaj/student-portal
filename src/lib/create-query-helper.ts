import { createQuery } from "react-query-kit";

export const createQueryHelper = <R, V>(
  name: string,
  fn: (variables: V) => Promise<R>
) => {
  return createQuery<R, V>(name, ({ queryKey: [_, variables] }) =>
    fn(variables as V)
  );
};
