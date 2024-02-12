import {
  Box,
  chakra,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

import { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider, { Settings } from "react-slick";
import directorImage from "../../images/director_opening_speech.jpg";

const slides = [
  {
    graphic: (
      <chakra.iframe
        pos="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        border={0}
        src="https://www.youtube-nocookie.com/embed/4SZFMz4xB38?si=sgZ6UFbhMOPb2LLU&amp;controls=0&playsinline=1&showinfo=0&autohide=1&disablekb=1&loop=1&rel=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></chakra.iframe>
    ),
  },
  {
    graphic: (
      <Image
        src={directorImage}
        alt=""
        fill
        style={{
          objectFit: "cover",
          zIndex: 100,
        }}
        priority
      />
    ),
    title: "The Director Welcomes All Students",
    content: [
      "Prof E. B. Omobowale, Professor of Medicine and Literature & Director UIDLC, welcomes all new and returning students in UI-ODeL mode to a new academic session.",
    ],
  },
];

const settings: Settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default function LoginCarousel() {
  const [slider, setSlider] = useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "108%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "-58px" });

  return (
    <Box bg="primary.500" w={["full", null, "66.6%"]} p={[null, null, "5rem"]}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Box
        pos="relative"
        h="full"
        _before={{
          content: "''",
          display: ["none", null, "block"],
          pos: "absolute",
          w: "100%",
          h: "100%",
          top: "1.5rem",
          left: "1.5rem",
          bg: "white",
        }}
        sx={{
          "& .slick-slider": {
            height: "100%",
          },
          "& .slick-slider :where(.slick-list, .slick-track, .slick-slide)": {
            height: "100% !important",
          },
          "& .slick-slide": {
            display: "none !important",
            position: "static !important",
          },
          "& .slick-slide.slick-active": {
            display: "block !important",
          },
          "& .slick-slide > div": {
            height: "100%",
          },
          "& .slick-list": {
            overflow: "unset !important",
            overflowX: "clip !important",
          },
        }}
      >
        <IconButton
          aria-label="left-arrow"
          variant="unstyled"
          color={["primary.500", "white"]}
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        <IconButton
          aria-label="right-arrow"
          variant="unstyled"
          color={["primary.500", "white"]}
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {slides.map((slide, index) => (
            <Box key={index} pos="relative" h="full">
              <Box pos="relative" h={["20rem", null, "full"]}>
                {slide.graphic}
              </Box>
              {slide.title && slide.content ? (
                <Box
                  w={[null, null, "50%"]}
                  pos={[null, null, "absolute"]}
                  p="2rem"
                  bg="primary.500"
                  bottom={[null, null, "-1.5rem"]}
                  color="white"
                  zIndex={101}
                >
                  <Heading as="h2" size="lg">
                    {slide.title}
                  </Heading>
                  <Text mt={2}>
                    {slide.content.map((content) => (
                      <span key={content}>
                        {content} <br />
                      </span>
                    ))}
                  </Text>
                </Box>
              ) : null}
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
