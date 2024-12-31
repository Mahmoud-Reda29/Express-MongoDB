import { Router } from "express";
import {
  createDocumentByUnWinding,
  deleteBookDocument,
  excludeBookDocumentWithGenre,
  filterBookDcoumentByYear,
  filterBookDocumentWithAggregation,
  findBookDocumentByGenre,
  findBookDocumentByYear,
  findBookDocumentsByLimit,
  findBookDocumentWithIntYear,
  findDocument,
  insertManyIntoCollection,
  insertOneIntoCollection,
  joinTwoCollection,
  updateCollection,
} from "./books.service.js";

const router = Router();

router.post("/", insertOneIntoCollection);
router.post("/batch", insertManyIntoCollection);
router.get("/title", findDocument);
router.get("/year", findBookDocumentByYear);
router.get("/genre", findBookDocumentByGenre);
router.delete("/before-year", deleteBookDocument);
router.patch("/:title", updateCollection);
router.get("/skip-limit", findBookDocumentsByLimit);
router.get("/year-integer", findBookDocumentWithIntYear);
router.get("/exclude-genres", excludeBookDocumentWithGenre);
router.get("/aggregate1", filterBookDocumentWithAggregation);
router.get("/aggregate2", filterBookDcoumentByYear);
router.get("/aggregate3", createDocumentByUnWinding);
router.get("/aggregate4", joinTwoCollection);

export default router;
