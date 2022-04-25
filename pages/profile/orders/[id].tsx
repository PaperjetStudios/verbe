import { Box, Button } from "@chakra-ui/react";

import Holder from "../../../components/profile/Holder/Holder";

const pageQuery = "profile";

const OrderSinglePage = (props) => {
  return (
    <Box>
      <Holder title="Order" content={<>Hello</>} />
    </Box>
  );
};

export default OrderSinglePage;
