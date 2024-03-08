import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const { id } = req.body;

    //id will be converted to string, since we passed our date to JSON.stringify({id})
    //id passed to server  '623fc7fdf7b47ca63c65272d'
    const objectId = new ObjectId(id);
    // console.log({ id, objectId }); // {id: '623fc7fdf7b47ca63c65272d',  objectId: new ObjectId("623fc7fdf7b47ca63c65272d")}

    const { Endpoints } = await require("@db").default();

    const endpoint = await Endpoints.findOne(
      //  query criteria
      { _id: objectId },
      // projection
      {
        _id: 0,
        title: 1,
        latenct: 1,
        rating: 1,
        description: 1,
        codeSnippet: 1,
        successResponse: 1,
      }
    );

    if (!endpoint) return res.status(404).json(null);

    return res.status(200).json(endpoint);
  } catch (error) {
    return res.status(401).json(false);
  }
};

// Read more here: https://www.mongodb.com/docs/v4.4/reference/method/db.collection.findOne/

// FindOne takes two parameters:
// 1.query: Optional. Specifies query selection criteria using query operators.
// 2. projection: Optional. Specifies the fields to return using projection operators. Omit this parameter to return all fields in the matching document. For details, see Projection.

// Returns one document that satisfies the specified query criteria on the collection or view. If multiple documents satisfy the query, this method returns the first document according to the natural order which reflects the order of documents on the disk. In capped collections, natural order is the same as insertion order. If no document satisfies the query, the method returns null.
