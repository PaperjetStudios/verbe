import React, { Component, useRef, useState } from "react";
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
  const nav1 = useRef();
  const nav2 = useRef();

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

  const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  return (
    <Box className={styles.galleryContainer}>
      <Slider
        asNavFor={nav2.current}
        ref={nav1}
        className={styles.slider}
        {...settings}
      >
        {items.map((item, index) => {
          return (
            <div key={`slide_${index}`}>
              <AspectRatio
                ratio={0.8}
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
      <Slider
        asNavFor={nav1.current}
        ref={nav2}
        className={styles.slider_sub}
        {...settings2}
      >
        {items.map((item, index) => {
          return (
            <div key={`slide_nav2_${index}`}>
              <AspectRatio
                ratio={1}
                className={styles.slide_small}
                style={{
                  backgroundImage: `url(${createImageLink(
                    item.attributes.formats.thumbnail.url
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
