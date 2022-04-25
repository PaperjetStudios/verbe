import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export type NewsletterSignupProps = {};

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({}) => {
  return (
    <InputGroup
      size="md"
      border="transparent 1px solid"
      borderBottom="1px solid #000"
      boxShadow="none"
    >
      <Input
        pr="4.5rem"
        pl="0"
        _focus={{
          outlineWidth: "0px !important;",
        }}
        _hover={{
          outlineWidth: "0px !important;",
        }}
        fontSize="sm"
        type="email"
        placeholder="Enter your email"
        borderRadius="0"
        _placeholder={{ color: "#666666" }}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          fontSize="12px"
          fontWeight={400}
          size="sm"
          onClick={() => {
            console.log("do_smometh");
          }}
          variant={"ghost"}
        >
          Subscribe
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default NewsletterSignup;
