export default function filterUnique<T, S extends {}>(
  items: T[],
  selector?: (item: T) => S
) {
  const set = new Set<T | S>();

  return items.filter((item) => {
    const id = selector ? selector(item) : item;
    const duplicate = set.has(id);
    set.add(id);
    return !duplicate;
  });
}
