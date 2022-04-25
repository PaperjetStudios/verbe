import { Box, Button } from "@chakra-ui/react";
import InnerBox from "../../components/Common/InnerBox/InnerBox";
import Holder from "../../components/profile/Holder/Holder";
import Profile from "../../components/profile/Profile/Profile";

const pageQuery = "profile";

const Dashboard = () => {
  return (
    <InnerBox>
      <Holder title="Profile" content={<Profile />} />
    </InnerBox>
  );
};

export default Dashboard;
