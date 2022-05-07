import { NextApiRequest, NextApiResponse } from "next";

import { setCookie } from "nookies";
import { createStrapiAxios } from "../../config/api";
import { emptyUser } from "../../config/UserTypes";

export default async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = await req.body;
  let user = emptyUser;

  try {
    await createStrapiAxios(null)
      .post("api/auth/local", {
        identifier: email,
        password,
      })
      .then((result) => {
        user = {
          isLoggedIn: true,
          jwt: result.data.jwt,
          user: result.data.user,
        };

        setCookie({ res }, "user", JSON.stringify({ ...user }), {
          secure: process.env.NODE_ENV === "production",
          maxAge: 72576000,
          httpOnly: true,
          path: "/",
        });

        res.json({ ...user });
        //  res.end();
      });
  } catch (error) {
    console.log(error);
    res.status(500).end();
    //  res.end();
  }

  res.status(500).end();
}
