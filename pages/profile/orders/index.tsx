import InnerBox from "../../../components/Common/InnerBox/InnerBox";
import OrderFilter from "../../../components/Common/OrderFilter/OrderFilter";
import Holder from "../../../components/profile/Holder/Holder";
import Orders from "../../../components/profile/Orders/Orders";

const pageQuery = "profile";

const OrdersPage = () => {
  return (
    <InnerBox>
      <Holder
        title={"Your Orders"}
        buttons={[<OrderFilter key="filter" />]}
        content={<Orders />}
      />
    </InnerBox>
  );
};

export default OrdersPage;
