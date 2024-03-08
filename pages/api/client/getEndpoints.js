export default async (req, res) => {
  try {
    const { searchPhrase } = req.body;
    const { Endpoints } = await require("@db").default();

    if (searchPhrase) {
      return res.status(200).json(result);
    } else {
      const searchQuery = [{ $sample: { size: 10 } }, { $project: { title: 1, _id: 1 } }];

      const result = await Endpoints.aggregate(searchQuery, {
        cursor: { batchSize: 10 },
      }).toArray();

      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(401).json(false);
  }
};

// Read more here: https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/
// Given an array of documents, insertMany() inserts each document in the array into the collection.

// The number of operations in each group cannot exceed the value of the maxWriteBatchSize of the database. As of MongoDB 3.6, this value is 100,000. This value is shown in the hello.maxWriteBatchSize field.

// This limit prevents issues with oversized error messages. If a group exceeds this limit, the client driver divides the group into smaller groups with counts less than or equal to the value of the limit. For example, with the maxWriteBatchSize value of 100,000, if the queue consists of 200,000 operations, the driver creates 2 groups, each with 100,000 operations.

// If the collection does not exist, then insertMany() creates the collection on successful write.
