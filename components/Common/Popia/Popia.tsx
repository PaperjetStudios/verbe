import { Box, Button, Link, Text, useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { setPopia } from "../../../store/atoms/popia/popia";

import styles from "./Popia.module.scss";

import NextLink from "next/link";

export type PopiaProps = {};

const Popia: React.FC<PopiaProps> = ({}) => {
  const [accepted, setAccepted] = useAtom(setPopia);
  const toast = useToast();
  const toastIdRef = useRef();
  const id = "popi-toast";

  useEffect(() => {
    if (!accepted && !!toast.isActive(id)) {
      //@ts-ignore
      toastIdRef.current = toast({
        id,
        title: "This site uses cookies",
        description: "We've created your account for you.",
        status: "success",
        duration: null,
        isClosable: false,
        position: "bottom-left",
        render: () => {
          return (
            <Box
              p={5}
              px={5}
              bg="white"
              shadow={3}
              rounded="lg"
              w={"100%"}
              maxW={["100%", null, "450px"]}
            >
              <Text fontSize="lg" mb={2} fontWeight={"500"}>
                This site uses cookies
              </Text>
              <Text fontSize="sm" mb={4}>
                We use cookies to analyse site traffic and better serve you. By
                continuing to use our site, you consent to the use of cookies in
                accordance with our{" "}
                <NextLink href="/privacy-policy" passHref>
                  <Link textDecoration={"underline"}>Privacy Policy</Link>
                </NextLink>
              </Text>
              <Button
                w={"100%"}
                onClick={() => {
                  setAccepted(true);
                  toast.close(toastIdRef.current);
                }}
                variant="main"
              >
                Accept All Terms
              </Button>
            </Box>
          );
        },
      });
    }
  }, [accepted, toastIdRef]);

  return <Box className={styles.container}></Box>;
};

export default Popia;
