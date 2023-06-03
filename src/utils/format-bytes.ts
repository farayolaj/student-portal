export default function formatBytes(bytes: number, decimals?: number) {
  if (bytes == 0) return "0 Bytes";
  var k = 1000,
    dm = decimals || 2,
    sizes = ["Bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
