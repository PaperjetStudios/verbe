import { useEffect, useRef, useState } from "react";

import { useAtom } from "jotai";
import { toggleMobileMenu } from "../../data/atoms/mobile-menu/mobile-menu";
import { Router } from "next/router";
import { ToggleSearchModal } from "../../data/atoms/search/searchAtoms";

function ResetState() {
  const [isOpen, setIsOpen] = useAtom(toggleMobileMenu);
  const [isSearchOpen, setIsSearchOpen] = useAtom(ToggleSearchModal);

  Router.events.on("routeChangeStart", () => {
    setIsOpen(false);
    setIsSearchOpen(false);
  });

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, []);

  return <></>;
}

export default ResetState;
