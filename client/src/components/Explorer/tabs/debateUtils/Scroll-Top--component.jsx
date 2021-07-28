import React, { useRef, useEffect, useState } from "react";
import { useScroll } from "react-use";
import { CUSTOMER } from "../../../../constants/index";

function ScrollTop({ offset, parentScrollTop }) {
  //   const { y: pageYOffset } = useWindowScroll();
  //https://www.pluralsight.com/guides/scrolling-inside-a-div-in-react
  //   const scrollRef = useRef(null);
  //   const { y: yoffset } = useScroll(scrollRef);
  const [visible, setVisibility] = useState(false);
  useEffect(() => {
    // console.info(`[DEBUG][OFFSET] The value of the offset is ${offset}`);
    if (offset > 400) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [offset]);
  const scrollToTop = () => {
    parentScrollTop();
  };

  if (!visible) {
    return false;
  }
  return (
    <div
      className={
        CUSTOMER === "KLA" ? "scroll-to-top--kla" : "scroll-to-top--klc"
      }
      onClick={scrollToTop}
    >
      <i className="icon fa fa-chevron-up"></i>
    </div>
  );
}

export default ScrollTop;
