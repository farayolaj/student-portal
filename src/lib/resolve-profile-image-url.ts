import { IMG_SERVER } from "../constants/config";

export default function resolveProfileImageUrl(name: string) {
  const path = name.includes("assets")
    ? `${IMG_SERVER}/${name}`
    : `${IMG_SERVER}/assets/images/profile/${name}`;

  return path;
}
