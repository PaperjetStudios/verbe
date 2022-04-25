import InnerBox from "../../../components/Common/InnerBox/InnerBox";
import Holder from "../../../components/profile/Holder/Holder";

const pageQuery = "profile";

const OrdersPage = () => {
  return (
    <InnerBox>
      <Holder title="Orders" content={<>Hello</>} />
    </InnerBox>
  );
};

export default OrdersPage;
