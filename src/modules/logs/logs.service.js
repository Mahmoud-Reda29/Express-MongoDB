import { database } from "../../DB/connection.js";

export const insertOneIntoLog = async (req, res) => {
  try {
    //! mongoShell way
    // db.logs.insertOne({ "book_id": "64b5c2d8a123456ef8914", "action": "borrowed"});
    //! express way
    const result = await database.collection("logs").insertOne(req.body);
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

