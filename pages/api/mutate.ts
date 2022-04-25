import { NextApiRequest, NextApiResponse } from "next";

import client from "../../config/api";
import { CreateReviewDataType } from "../../data/reviews/data";
import { CREATE_REVIEW } from "../../data/reviews/queries";

import { getParsedUserCookies } from "./util";

export default async function mutateRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let returnObj: any = { nothing: true };
  const { jwt } = getParsedUserCookies(req);

  if (jwt) {
    if (req.method === "POST") {
      try {
        if (req.body.type === "review") {
          const { data } = await client(jwt).mutate<CreateReviewDataType>({
            mutation: CREATE_REVIEW,
            variables: { data: req.body.variables },
          });

          returnObj = data;
        }
      } catch (e) {
        console.log(e);
        console.log(e?.networkError?.result?.errors);
      }
    } else {
    }
  }
  res.json(returnObj);
}
