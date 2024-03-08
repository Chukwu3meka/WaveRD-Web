// import { Players } from "model";

export default async (req, res) => {
  try {
    const { Players } = await require("@db").default();
    const { playerID } = req.body;

    // // specify fields you want MongoDB to return in the second parameter
    // const result = await Players.findById(playerID, {
    //   club: 1,
    //   country: 1,
    //   dob: 1,
    //   emotion: 1,
    //   name: 1,
    //   rating: 1,
    //   roles: 1,
    //   value: 1,
    // });

    const searchQuery = [
      {
        $match: {
          _id: playerID,
        },
      },
      {
        $lookup: {
          from: "clubs",
          localField: "club",
          foreignField: "_id",
          as: "clubCollection",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ["$clubCollection", 0],
              },
              "$$ROOT",
            ],
          },
        },
      },
      {
        $replaceWith: {
          $mergeObjects: [
            {
              ref: "$_id",
              name: "$name",
              roles: "$roles",
              clubRef: "$club",
              stat: [
                { label: "club", data: "$title" },
                { label: "country", data: "$country" },
                { label: "age", data: "$dob" },
                { label: "emotion", data: "$emotion" },
                { label: "rating", data: "$rating" },
                { label: "value", data: "$value" },
              ],
            },
          ],
        },
      },
    ];

    const result = await Players.aggregate(searchQuery, {
      cursor: { batchSize: 1 },
    }).toArray();

    // return first array since its only one player we're after
    return res.status(200).json(result[0]);

    // return res.status(200).json({
    //   ref: result._id,
    //   name: result.name,
    //   roles: result.roles,
    //   stat: [
    //     { label: "club", data: result.club },
    //     { label: "country", data: result.country },
    //     { label: "dob", data: new Date(result.dob).toDateString() },
    //     { label: "emotion", data: result.emotion },
    //     { label: "rating", data: result.rating },
    //     { label: "value", data: result.value },
    //   ],
    // });

    //   {
    //     $mergeObjects: [
    // "$$ROOT",      {
    //   club: "$title" ,stat:[
    //     { label: "club", data: "$club" }
    // ]

    // }
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
