import { Router } from "express";
import { Book } from "./types";

const router = Router();

let books: Book[] = [];

//libros
router.get("/", (req, res) => {
  res.json(books);
});

//libro por ID
router.get("/:id", (req, res) => {
  const book = books.find((b) => b._id === req.params.id);
  book ? res.json(book) : res.status(404).json({ message: "Not found" });
});

//crear libro
router.post("/", (req, res) => {
  const { title, author, pages } = req.body;
  if (
    typeof title === "string" &&
    typeof author === "string" &&
    typeof pages === "number"
  ) {
    books.push(req.body);
    res.status(201).json(req.body);
  } else {
    res.status(400).json({ message: "Invalid input body" });
  }
});

//update libro
router.put("/:id", (req, res) => {
  const index = books.findIndex((b) => b._id === req.params.id);
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

//delete libro
router.delete("/:id", (req, res) => {
  const index = books.findIndex((b) => b._id === req.params.id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: "Deleted successfully" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

export default router;

