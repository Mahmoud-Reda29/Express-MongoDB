import { database } from "../../DB/connection.js";

export const createCollectionexplicit = async (req, res) => {
  //! mongoShell way
  //   db.createCollection("books",{
  //     validatior: {
  //         $and: [
  //           {
  //             title: {
  //               $type: "string",
  //             },
  //           },
  //         ],
  //       },
  //       validationLevel: "strict",
  //     } )
  //! express way
  const options = {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"], // Ensures the "title" field is required
        properties: {
          title: {
            bsonType: "string", // Ensures "title" is a string
            description: "Title must be a non-empty string",
          },
        },
      },
    },
    validationLevel: "strict", // Enforces validation rules strictly
  };
  if (!collectionName) {
    return res.status(400).json({ message: "Collection name is required" });
  }
  try {
    await database.createCollection("books", options);
    res
      .status(201)
      .json({ message: `${collectionName} Collection created successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const createCollectionimplicit = async (req, res) => {
  const { name, nationality } = req.body;
  if (!name || !nationality) {
    return res
      .status(400)
      .json({ message: " Fields name and nationality are required" });
  }
  try {
    //! mongoShell way
    //   db.authors.insertOne({ "name": "auhtor1", "nationality": "british" });
    //! Express way
    const result = await database
      .collection("authors")
      .insertOne({ name: name, nationality: nationality });
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const createCappedCollection = async (req, res) => {
  try {
    //! mongoShell way
    // db.createCollection("logs", { capped: true, size: 100, max: 2 });
    //! express way
    await database.createCollection("logs", {
      capped: true,
      size: 1024 * 1024,
    });
    res.status(201).json({ message: "Done" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const createCollectionIndex = async (req, res) => {
  try {
    //! mongoShell way
    // db.books.createIndex({ title: 1 });
    //! express way
    await database.collection("books").createIndex({ title: 1 });
    res.status(201).json({ message: "Done" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};










