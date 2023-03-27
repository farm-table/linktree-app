// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
type DataAttributes = {
  display_type?: string;
  trait_type: string;
  value: string | number;
};

type Data = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: DataAttributes[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: "BrainFriendship",
    description:
      "Family comes and goes... A blockchain friendship, that's forever. You're now BrainFried's friend.",
    image: "https://brainfried.xyz/assets/brainFriendshipnft.png",
    external_url: "https://twitter.com/BrainFriedEth",
    attributes: [
      {
        trait_type: "Token",
        value: "Polygon",
      },
      {
        trait_type: "Base",
        value: "Starfish",
      },
    ],
  });
}
