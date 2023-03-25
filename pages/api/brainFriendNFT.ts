// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  description: string;
  image: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: "BrainFriendship",
    description:
      "Family comes and goes... A blockchain friendship, that's forever. You're now BrainFried's friend.",
    image: "",
  });
}
