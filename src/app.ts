import express from "express";
import cors from "cors";
import { Recipe } from "./models";
import { MongoHandler } from "./services";

// const mongoHandler = container.get<IMongoHandler>(TYPES.MongoHandler);
const mongoHandler = new MongoHandler();
mongoHandler.init();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/status", (req, res) => {
  res.json({
    success: true
  });
});

app.get("/receipes", async (req, res) => {
  const recipes = await mongoHandler.getRecipes();
  res.json(recipes);
});

app.get("/receipes/:id", async (req, res) => {
  const recipe = await mongoHandler.getRecipe(req.params.id);
  res.json(recipe);
});

app.post("/receipes", async (req, res) => {
  const recipe = req.body as Recipe;
  await mongoHandler.createRecipe(recipe);
  res.json(recipe);
});

app.put("/receipes/:id", async (req, res) => {
  const recipe = req.body as Recipe;
  await mongoHandler.updateRecipe(req.params.id, recipe);
  res.json(recipe);
});

app.delete("/receipes/:id", async (req, res) => {
  await mongoHandler.deleteRecipe(req.params.id);
  res.json();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
