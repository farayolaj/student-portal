export default function isValidUrl(str: string) {
  try {
    return Boolean(new URL(str));
  } catch (_e) {
    void _e;
    return false;
  }
}
