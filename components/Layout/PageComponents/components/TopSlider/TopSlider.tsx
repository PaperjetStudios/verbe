import React, { Component } from "react";
import styles from "./styles.module.scss";
import Slider from "react-slick";

import { Box, Button } from "@chakra-ui/react";
import { Icons } from "../../../../Common/icons";
import { createImageLink } from "../../../../../config/util";
import { ComponentLayoutGallery } from "../../../../../data/layout/gallery";
import ReactMarkdown from "react-markdown";

type TopSliderProps = {
  layout: ComponentLayoutGallery;
};

const TopSlider: React.FC<TopSliderProps> = ({ layout }) => {
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
    autoplay: true,

    autoplaySpeed: 4000,
  };

  return (
    <Box className={styles.container}>
      <Slider className={styles.slider} {...settings}>
        {layout.Image.map((item, index) => {
          return (
            <div key={`slide_${index}`}>
              <div
                className={styles.slide}
                style={{
                  backgroundImage: `url(${createImageLink(
                    item?.Source?.data?.attributes.url
                  )})`,
                }}
              >
                <div className={styles.titleBox}>
                  <ReactMarkdown>{item.Text}</ReactMarkdown>
                  <Button variant="main_white">{item.cta_title}</Button>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </Box>
  );
};

export default TopSlider;
