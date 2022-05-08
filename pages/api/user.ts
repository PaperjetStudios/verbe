import { NextApiRequest, NextApiResponse } from "next";

import client, { createStrapiAxios } from "../../config/api";
import { gql } from "@apollo/client";

import { destroyCookie, setCookie } from "nookies";

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
      if (req.body.type === "delete") {
        console.log(jwt);
        try {
          await client(jwt)
            .mutate({
              mutation: gql`
                mutation {
                  deleteMe {
                    deleted
                    error
                  }
                }
              `,
              variables: { user: user.id },
            })
            .then((data) => {
              destroyCookie({ res }, "user", {
                path: "/",
              });

              res.json({ deleted: true });
            });
        } catch (e) {
          console.log(e);
          console.log(e.networkError?.result?.errors);
          res.json(e);
          res.status(405).end();
        }
      } else {
        try {
          await client(jwt)
            .mutate({
              mutation: gql`
                ${USER_FRAGMENT}
                mutation ($newData: UsersPermissionsUserInput!, $id: ID!) {
                  updateUsersPermissionsUser(id: $id, data: $newData) {
                    ...USER_FRAGMENT
                  }
                }
              `,
              variables: { newData: req.body, id: user.id },
            })
            .then((data) => {
              // console.log(data.data.updateUsersPermissionsUser.data.attributes);
              newUser = {
                isLoggedIn: true,
                user: {
                  ...user,
                  //@ts-ignore
                  ...data.data.updateUsersPermissionsUser.data.attributes,
                },
              };
              setCookie(
                { res },
                "user",
                JSON.stringify({ ...newUser, jwt: jwt }),
                {
                  secure: process.env.NODE_ENV === "production",
                  maxAge: 72576000,
                  httpOnly: true,
                  path: "/",
                }
              );
              res.json(newUser);
            });
        } catch (e) {
          console.log(e.networkError?.result?.errors);
          res.json(e);
          res.status(405).end();
        }
      }
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
