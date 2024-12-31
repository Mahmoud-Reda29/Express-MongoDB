import { database } from "../../DB/connection.js";
export const insertOneIntoCollection = async (req, res) => {
  const { title, author, year, genres } = req.body;
  try {
    //! mongoShell way
    // db.books.insertOne({ title: "book1", author: "ali", year: 1937 , "genres": ["drama", "romance"] });
    //! express way
    const result = await database.collection("books").insertOne({
      title,
      author,
      year,
      genres,
    });
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const insertManyIntoCollection = async (req, res) => {
  const { books } = req.body;
  try {
    //! mongoShell way
    // db.books.insertMany(
    //   {
    //     title: "Future",
    //     author: "George Orwell",
    //     year: 2020,
    //     genres: ["Science Fiction"],
    //   },
    //   {
    //     title: "To kill a mockingbird",
    //     author: "Harper Lee",
    //     year: 1960,
    //     genres: ["Classic", "Fiction"],
    //   },
    //   {
    //     title: "Brave New World",
    //     author: "Aldous Huxley",
    //     year: 2006,
    //     genres: ["Dystopian", "Science Ficton"],
    //   }
    // );
    //! express way
    if (books.length < 3) {
      return res.status(400).json({
        message: "The 'books' array must contain at least three records.",
      });
    }
    const result = await database.collection("books").insertMany(books);
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const updateCollection = async (req, res) => {
  const { title } = req.params;
  try {
    //! mongoShell way
    // db.books.updateOne({ title: "Future" }, { $set: { year: 2022 } });
    //! express way
    const result = await database
      .collection("books")
      .updateOne({ title: title }, { $set: { year: 2022 } });
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const findDocument = async (req, res) => {
  const { title } = req.query;
  //! mongoShell way
  // db.books.findOne({ title: "Future" });
  //! express way
  try {
    const result = await database.collection("books").findOne({ title: title });
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const findBookDocumentByYear = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      message: "Query parameters 'from' and 'to' are required.",
    });
  }

  const fromYear = parseInt(from, 10);
  const toYear = parseInt(to, 10);

  if (isNaN(fromYear) || isNaN(toYear)) {
    return res.status(400).json({
      message: "'from' and 'to' query parameters must be valid numbers.",
    });
  }

  try {
    //! mongoShell way
    // db.books.find({ year: { $gte: 2000, $lte: 2020 } });
    //! express way
    const result = await database
      .collection("books")
      .find({ year: { $gte: fromYear, $lte: toYear } })
      .toArray();
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const findBookDocumentByGenre = async (req, res) => {
  const { genre } = req.query;

  if (!genre) {
    return res.status(400).json({
      message: "genre is required.",
    });
  }
  try {
    //! mongoShell way
    // db.books.find({ genres: "Science Fiction" });
    //! express way
    const result = await database
      .collection("books")
      .find({ genres: genre })
      .toArray();
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const findBookDocumentsByLimit = async (req, res) => {
  try {
    //! mongoShell way
    // db.books.find().sort({ year: -1 }).skip(2).limit(3);
    //! express way
    const result = await database
      .collection("books")
      .find()
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const findBookDocumentWithIntYear = async (req, res) => {
  try {
    //! mongoShell way
    // db.books.find({ year: { $type: "int" } });
    //! express way
    const result = await database
      .collection("books")
      .find({ year: { $type: "int" } })
      .toArray();
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const excludeBookDocumentWithGenre = async (req, res) => {
  try {
    //! mongoShell way
    // db.books.find({ genres: { $nin: ["Horror", "Science Fiction"] } });
    //! express way
    const result = await database
      .collection("books")
      .find({
        genres: { $nin: ["Horror", "Science Fiction"] },
      })
      .toArray();
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const deleteBookDocument = async (req, res) => {
  const { year } = req.query;
  if (!year) {
    return res.status(400).json({
      message: "year field is required.",
    });
  }
  if (isNaN(year)) {
    return res.status(400).json({
      message: "year field must be valid number.",
    });
  }
  try {
    //! mongoShell way
    // db.books.deleteMany({ year: { $lt: 2000 } });
    //! express way

    const result = await database
      .collection("books")
      .deleteMany({ year: { $lt: parseInt(year) } });
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const filterBookDocumentWithAggregation = async (req, res) => {
  try {
    //! mongoShell way
    // db.books.aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }]);
    //! express way
    const result = await database
      .collection("books")
      .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
      .toArray();
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const filterBookDcoumentByYear = async (req, res) => {
  try {
    //! mongoShell way
    // db.books.aggregate([{ $match: { year: { $gt: 2000 } } }, { $project: { _id: 0, title: 1, author: 1, year: 1 } }]); 
    //! express way
    const books = await database
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } }, 
      ])
      .toArray();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const createDocumentByUnWinding = async (req, res) => {
  try {
    //! mongoShell way
    // db.books.aggregate([{ $unwind: "$genres" }]);
    //! express way
    const result = await database
      .collection("books")
      .aggregate([
        { $unwind: "$genres" },
        { $project: { title: 1, genres: 1, _id: 0 } },
      ])
      .toArray();
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const joinTwoCollection = async (req, res) => {
  try {
    //! mongoShell way
    // db.logs.aggregate([
    //   {
    //     $lookup: {
    //       from: "books", 
    //       localField: "book_id", 
    //       foreignField: "_id", 
    //       as: "book_details" 
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 0, 
    //       action: 1, 
    //       book_details: {
    //         $map: {
    //           input: "$book_details",
    //           as: "book",
    //           in: {
    //             title: "$$book.title",
    //             author: "$$book.author",
    //             year: "$$book.year"
    //           }
    //         }
    //       }
    //     }
    //   }
    // ]);    
    //! express way
    const result = await database
      .collection("logs")
      .aggregate([
        {
          $addFields: {
            book_id: { $toObjectId: "$book_id" } 
          }
        },
        {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book_details"
          }
        },
        {
          $project: {
            _id: 0,
            action: 1,
            book_details: {
              $map: {
                input: "$book_details",
                as: "book",
                in: {
                  title: "$$book.title",
                  author: "$$book.author",
                  year: "$$book.year"
                }
              }
            }
          }
        }
      ])
      .toArray();
    res.status(201).json({ message: "Done", result });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};
