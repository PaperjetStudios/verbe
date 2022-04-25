import React, { Component } from "react";
import styles from "./Gallery.module.scss";
import Slider from "react-slick";

import { AspectRatio, Box, Button } from "@chakra-ui/react";
import { createImageLink } from "../../../config/util";
import { ImageType } from "../../../data/layout/base";
import { Icons } from "../../Common/icons";

type GallerySliderProps = {
  items: { attributes: ImageType }[];
};

const Gallery: React.FC<GallerySliderProps> = ({ items }) => {
  const settings = {
    dots: false,
    prevArrow: (
      <button className={styles.left_arrow}>{Icons.chevron.left}</button>
    ),
    nextArrow: (
      <button className={`${styles.arrow} ${styles.right_arrow}`}>
        {Icons.chevron.right}
      </button>
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box className={styles.galleryContainer}>
      <Slider className={styles.slider} {...settings}>
        {items.map((item, index) => {
          return (
            <div key={`slide_${index}`}>
              <AspectRatio
                ratio={1}
                className={styles.slide}
                style={{
                  backgroundImage: `url(${createImageLink(
                    item.attributes.url
                  )})`,
                }}
              >
                <></>
              </AspectRatio>
            </div>
          );
        })}
      </Slider>
    </Box>
  );
};

export default Gallery;
