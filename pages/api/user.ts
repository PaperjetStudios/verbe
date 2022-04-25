import { NextApiRequest, NextApiResponse } from "next";

import client, { createStrapiAxios } from "../../config/api";
import { gql } from "@apollo/client";

import { setCookie } from "nookies";

import { getParsedUserCookies } from "./util";
import { USER_FRAGMENT } from "../../data/user/queries";
import { emptyUser } from "../../config/UserTypes";

export default async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, jwt } = getParsedUserCookies(req);

  let newUser = { isLoggedIn: true, user: user };
  if (jwt) {
    if (req.method === "POST") {
      try {
        const { data } = await client(jwt).mutate({
          mutation: gql`
            ${USER_FRAGMENT}
            mutation ($newData: UsersPermissionsUserInput!, $id: ID!) {
              updateUsersPermissionsUser(id: $id, data: $newData) {
                ...USER_FRAGMENT
              }
            }
          `,
          variables: { newData: req.body, id: user.id },
        });

        newUser.user = {
          ...newUser.user,
          ...data.updateUsersPermissionsUser.data.attributes,
        };
      } catch (e) {
        console.log(e.networkError?.result?.errors);
        res.json(e);
        res.status(405).end();
      }

      setCookie({ res }, "user", JSON.stringify({ ...newUser, jwt: jwt }), {
        secure: process.env.NODE_ENV === "production",
        maxAge: 72576000,
        httpOnly: true,
        path: "/",
      });
      res.json(newUser);
      res.end();
    } else {
      if (user) {
        if (req.query?.type === "refresh") {
          let newUser;

          try {
            await createStrapiAxios(jwt)
              .get("api/users/me")
              .then((result) => {
                newUser = {
                  user: result.data,
                };

                setCookie(
                  { res },
                  "user",
                  JSON.stringify({ user: newUser.user, jwt: jwt }),
                  {
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 72576000,
                    httpOnly: true,
                    path: "/",
                  }
                );
                res.json({ isLoggedIn: true, user: newUser.user });
                res.end();
              });
          } catch (e) {
            res.json(e);
            res.status(405).end();
          }
        } else {
          res.json({ isLoggedIn: true, user });
          res.end();
        }
      } else {
        res.json(emptyUser);
        res.end();
      }

      // GET THE USER COOKIE
    }
  } else {
    res.json(emptyUser);
    res.end();
  }
}
