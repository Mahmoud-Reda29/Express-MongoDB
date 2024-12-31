import Router from "express";
import {
  createCappedCollection,
  createCollectionexplicit,
  createCollectionimplicit,
  createCollectionIndex,
} from "./collection.service.js";

const router = Router();

router.post("/books", createCollectionexplicit);
router.post("/authors", createCollectionimplicit);
router.post("/logs/capped", createCappedCollection);
router.post("/books/index", createCollectionIndex);
export default router;
