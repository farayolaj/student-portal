import abstractOne from "../images/abstract_1.jpg";
import abstractTwo from "../images/abstract_2.jpg";
import abstractThree from "../images/abstract_3.jpg";
import abstractFour from "../images/abstract_4.jpg";
import abstractFive from "../images/abstract_5.jpg";
import abstractSix from "../images/abstract_6.jpg";
import abstractSeven from "../images/abstract_7.jpg";
import abstractEight from "../images/abstract_8.jpg";
import abstractNine from "../images/abstract_9.jpg";
import abstractTen from "../images/abstract_10.jpg";
import { StaticImageData } from "next/image";

let idx = 0;

const abstractImages = [
  abstractOne,
  abstractTwo,
  abstractThree,
  abstractFour,
  abstractFive,
  abstractSix,
  abstractSeven,
  abstractEight,
  abstractNine,
  abstractTen,
];

const map = new Map<string, StaticImageData>();

const getAbstractImage = (id: string) => {
  if (map.has(id)) return map.get(id) as StaticImageData;

  const image = abstractImages[idx];
  idx = (idx + 1) % abstractImages.length;

  map.set(id, image);
  return image;
};

export default getAbstractImage;
