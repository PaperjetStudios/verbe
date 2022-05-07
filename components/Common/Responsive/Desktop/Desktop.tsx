import { useMediaQuery } from "@react-hook/media-query";
import ClientOnly from "../../ClientOnly";

export type DesktopProps = { children: any };

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const matches = useMediaQuery("only screen and (min-width: 900px)");

  if (matches) {
    return <ClientOnly>{children}</ClientOnly>;
  } else {
    return <ClientOnly>{}</ClientOnly>;
  }
};
export default Desktop;
