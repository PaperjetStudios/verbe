import { Box } from "@chakra-ui/react";

import * as React from "react";

import styles from "./Swipable.module.scss";

export type SwipableProps = {
  children: any;
};

const Swipable: React.FC<SwipableProps> = ({ children }) => {
  /**
   * scroll feature
   **/

  /**
   *  create refs to manipulate elements imperatively.
   */
  const innerBoxRef = React.useRef<HTMLDivElement>();

  /**
   * event handler when click left arrow.
   *
   * we want to scroll horozontally and programatically.
   **/
  const handleLeftArrowIconClickEvent: React.EventHandler<
    React.MouseEvent<HTMLElement>
  > = React.useCallback(
    (e) => {
      if (innerBoxRef.current) {
        innerBoxRef.current.scrollBy({
          behavior: "smooth",
          left: -300,
        });
      }
    },
    [innerBoxRef]
  );

  /**
   * event handler when click right arrow.
   *
   * we want to scroll horozontally and programatically.
   **/
  const handleRightArrowIconClickEvent: React.EventHandler<
    React.MouseEvent<HTMLElement>
  > = React.useCallback(
    (e) => {
      if (innerBoxRef.current) {
        innerBoxRef.current.scrollBy({
          behavior: "smooth",
          left: 300,
        });
      }
    },
    [innerBoxRef]
  );

  /**
   * side effect to close unnecessary arrows
   *
   *  - if scrollbar, need to show arrows, otherwise, no arrows
   *  - ref: https://stackoverflow.com/questions/4880381/check-whether-html-element-has-scrollbars
   **/
  const [isNeedArrows, setNeedArrows] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (innerBoxRef.current) {
      /**
       * this condition shows if there is any overflow of the innerBox component.
       */
      if (innerBoxRef.current.scrollWidth > innerBoxRef.current.clientWidth) {
        // need to have scroll
        setNeedArrows(true);
      } else {
        // don't need it
        setNeedArrows(false);
      }
    }
  }, [
    innerBoxRef,
    ...(innerBoxRef.current ? [innerBoxRef.current.scrollWidth] : [null]),
    ...(innerBoxRef.current ? [innerBoxRef.current.clientWidth] : [null]),
    isNeedArrows,
    setNeedArrows,
  ]);

  /**
   * remove arrows if scroll position is on the edge
   *
   *  - use 'scroll' event handler to detect cur scroll position and remove unnecessary arrow
   *  - initial scroll position is 0 so default values for its state is 'false' and 'true'
   **/
  const [isNeedLeftArrow, setNeedLeftArrow] = React.useState<boolean>(false);
  const [isNeedRightArrow, setNeedRightArrow] = React.useState<boolean>(true);
  const handleScrollChangeEvent: React.EventHandler<
    React.UIEvent<HTMLDivElement>
  > = (e) => {
    const curScrollPos = e.currentTarget.scrollLeft;
    const maxScrollPos =
      e.currentTarget.scrollWidth - e.currentTarget.clientWidth;
    if (curScrollPos == 0) {
      setNeedLeftArrow(false);
    } else if (curScrollPos == maxScrollPos) {
      setNeedRightArrow(false);
    } else {
      setNeedLeftArrow(true);
      setNeedRightArrow(true);
    }
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.outerBox}>
        <Box
          className={styles.innerBox}
          ref={innerBoxRef}
          onScroll={handleScrollChangeEvent}
        >
          {children}
        </Box>
        {/* isNeedArrows && (
          <React.Fragment>
            {isNeedLeftArrow && (
              <div
                className="btnBox leftBtnBox"
                onClick={handleLeftArrowIconClickEvent}
              >
                Left Arrow
       
                <img src={RightArrowSvg} className="btn leftBtn" style={{ transform: "rotate(180deg)" }} />
       
              </div>
            )}
            {isNeedRightArrow && (
              <div
                className="btnBox rightBtnBox"
                onClick={handleRightArrowIconClickEvent}
              >
                right

                <img src={RightArrowSvg} className="btn rightBtn"/>
    
              </div>
            )}
          </React.Fragment>
        )}        */}
      </Box>
    </Box>
  );
};

export default Swipable;
