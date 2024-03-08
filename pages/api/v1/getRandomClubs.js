export default async (req, res) => {
  try {
    const { Clubs } = await require("@db").default();

    const { limit } = req.body;
    const docsLimit = typeof limit !== "number" ? 20 : limit > 20 ? 20 : limit === 20 ? 1 : limit;

    const searchQuery = [
      { $sample: { size: docsLimit } },
      {
        $replaceWith: {
          $mergeObjects: [
            {
              ref: "$_id",
              title: "$title",
              nickname: "$nickname",
              founded: "$founded",
              stadium: "$stadium",
              capacity: "$capacity",
              location: "$location",
              manager: "$manager",
            },
          ],
        },
      },
    ];

    const randomPlayers = await Clubs.aggregate(searchQuery, {
      cursor: { batchSize: docsLimit },
    }).toArray();

    return res.status(200).json(randomPlayers);
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};

//Read more here: https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/

//To get a random list of documents in MongoDB is one of the easiest aggregation you could run

// One of the built-in ways to do this is by using a $sample operator with a size configured to amount of retrieved documents.
