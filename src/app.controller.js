import { DbConnection } from "./DB/connection.js";
import collectionRouter from "./modules/collection/collection.controller.js";
import booksRouter from "./modules/books/books.controller.js";
import logsRouter from "./modules/logs/logs.controller.js";
const bootstrap = async (app, express) => {
  await DbConnection();
  app.use(express.json());
  app.use("/collection", collectionRouter);
  app.use("/books", booksRouter);
  app.use("/logs", logsRouter);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Invalid Url", url: req.originalUrl });
  });
};

export default bootstrap;
