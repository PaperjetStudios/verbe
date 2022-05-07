import { useEffect, useRef, useState } from "react";

import { useAtom } from "jotai";
import { toggleMobileMenu } from "../../data/atoms/mobile-menu/mobile-menu";
import { Router } from "next/router";

function ResetState() {
  const [isOpen, setIsOpen] = useAtom(toggleMobileMenu);

  Router.events.on("routeChangeStart", () => {
    setIsOpen(false);
  });

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return <></>;
}

export default ResetState;
