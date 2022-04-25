import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";
import { emptyUser } from "../../config/UserTypes";

//withIronSessionApiRoute(logoutRoute, sessionOptions);

export default async function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // req.session.user = emptyUser;
  destroyCookie({ res }, "user", {
    path: "/",
  });

  res.json(emptyUser);
}
