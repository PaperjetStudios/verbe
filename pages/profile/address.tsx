import { Box, Button } from "@chakra-ui/react";
import InnerBox from "../../components/Common/InnerBox/InnerBox";
import AddressList from "../../components/form/user/address/AddressList/AddressList";

import Holder from "../../components/profile/Holder/Holder";

const pageQuery = "profile";

const Dashboard = () => {
  return (
    <InnerBox>
      <Holder title="Address" content={<AddressList />} />
    </InnerBox>
  );
};

export default Dashboard;
