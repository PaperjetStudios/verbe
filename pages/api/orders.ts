import { NextApiRequest, NextApiResponse } from "next";
import { getFilteredOrders } from "../../data/orders/orders";

import { getParsedUserCookies } from "./util";

//export default withIronSessionApiRoute(orderRoute, sessionOptions);

export default async function orderRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, jwt } = getParsedUserCookies(req);

  if (jwt) {
    const filtered = await getFilteredOrders(
      user.id,
      req.body.page,
      req.body.pageSize,
      { jwt: jwt },
      req.body.filters
    );

    console.log(filtered);
    res.json({
      // @ts-ignore
      orders: filtered.data.orders.data,
      // @ts-ignore
      pagination: filtered.data.orders.meta.pagination,
    });
  } else {
    res.json([]);
  }
}
