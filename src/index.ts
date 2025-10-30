import express from "express";
import routerBooks from "./routes";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  if (req.method === "POST") {
    req.body._id = uuidv4();
    req.body.createdAt = new Date().toISOString();
    req.body.updatedAt = new Date().toISOString();
  }
  if (req.method === "PUT") {
    req.body.updatedAt = new Date().toISOString();
  }
  next();
});

app.use("/api/books", routerBooks);

app.listen(PORT, () => {
  console.log(`API de libros corriendo en http://localhost:${PORT}`);
});
