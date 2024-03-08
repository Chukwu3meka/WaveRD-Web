export default async (req, res) => {
  try {
    const { Players } = await require("@db").default();
    const { searchTerm } = req.body;

    const searchQuery = [
      {
        $search: {
          index: "playerAutoComplete",
          autocomplete: {
            query: searchTerm || "Kylian Mbappé", // set default searchTerm an MongoDB will true an error if search term is empty
            path: "name",
            fuzzy: { maxEdits: 1.0 },
          },
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          name: 1,
          // _id: 0, // by deafault _id will be returned, set to 0 if you don't need it
        },
      },
    ];

    const result = await Players.aggregate(searchQuery, {
      cursor: { batchSize: 3 },
    }).toArray();

    // const result = await Players.explain()
    //   .aggregate(searchQuery, (searchErr, searchResult) => {
    //     if (searchErr) throw searchErr;

    // console.log(result);
    //     return searchResult;
    //   })

    return res.status(200).json(result);
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
