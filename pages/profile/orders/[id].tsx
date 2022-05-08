import { Box, Button } from "@chakra-ui/react";

import Holder from "../../../components/profile/Holder/Holder";

import { ReactElement } from "react";

import { useRouter } from "next/router";

import nookies from "nookies";
import OrderSingle from "../../../components/Common/Orders/OrderSingle/OrderSingle";
import OrderStatus from "../../../components/Common/OrderStatus/OrderStatus";
import { getOrderById } from "../../../data/orders/orders";
import InnerBox from "../../../components/Common/InnerBox/InnerBox";

const OrderSinglePage = (props) => {
  // @ts-ignore
  return (
    <InnerBox>
      <Holder
        content={<OrderSingle orderProps={props.order} />}
        title={"#" + props.order.attributes.Unique}
        buttons={[<OrderStatus key="status" order={props.order} />]}
      />
    </InnerBox>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  const userInfo = JSON.parse(nookies.get(context).user);

  const order = await getOrderById(id, { jwt: userInfo.jwt });

  return {
    props: {
      order: order.data.order.data,
      user: userInfo.user.id,
    },
  };
};

export default OrderSinglePage;
