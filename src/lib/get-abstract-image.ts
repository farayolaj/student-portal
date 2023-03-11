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

const getAbstractImage = () => {
  const image = abstractImages[idx];
  idx = (idx + 1) % abstractImages.length;
  return image;
};

export default getAbstractImage;
