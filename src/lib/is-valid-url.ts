export default function isValidUrl(str: string) {
  try {
    return Boolean(new URL(str));
  } catch (e) {
    return false;
  }
}
