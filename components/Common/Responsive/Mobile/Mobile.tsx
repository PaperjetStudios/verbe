import { Box } from "@chakra-ui/react";
import { useMediaQuery } from "@react-hook/media-query";
import ClientOnly from "../../ClientOnly";

export type MobileProps = {
  children: any;
  [x: string]: any;
};

const Mobile: React.FC<MobileProps> = ({ children, ...delegated }) => {
  const matches = useMediaQuery("only screen and (max-width: 900px)");

  if (matches) {
    return <ClientOnly>{children}</ClientOnly>;
  } else {
    return (
      <ClientOnly>
        <></>
      </ClientOnly>
    );
  }
};

export default Mobile;
