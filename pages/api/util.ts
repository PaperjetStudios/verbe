import { NextApiRequest } from "next";
import { parseCookies } from "nookies";

export const getParsedUserCookies = (req: NextApiRequest) => {
  const parsedCookies = parseCookies({ req });
  const { user } = parsedCookies;
  if (user) {
    return JSON.parse(user);
  } else {
    return {
      user: undefined,
      jwt: undefined,
    };
  }
};
