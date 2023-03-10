import abstractOne from "../../images/abstract_1.jpg";
import abstractTwo from "../../images/abstract_2.jpg";
import abstractThree from "../../images/abstract_3.jpg";
import abstractFour from "../../images/abstract_4.jpg";
import abstractFive from "../../images/abstract_5.jpg";

const random = (num: number) => Math.floor(Math.random() * num);
const abstractImages = [
  abstractOne,
  abstractTwo,
  abstractThree,
  abstractFour,
  abstractFive,
];

const randomImage = () => abstractImages[random(abstractImages.length)];

export default randomImage;
