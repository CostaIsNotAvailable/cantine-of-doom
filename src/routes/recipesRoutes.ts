import express from 'express';
import { authentication, userIdCheck } from '../helpers';
import { Recipe } from '../models';
import { ExtendedRequest } from '../models/extendedRequest';
import { AuthService, MongoHandler } from '../services';

const router = express.Router();
const mongoHandler = new MongoHandler();
mongoHandler.init();
const authService = new AuthService();

router.get('/receipes', authentication, async (req: ExtendedRequest, res) => {
  const userId = req.user?.id;
  const recipes = await mongoHandler.getRecipes(userId);
  res.json(recipes);
});

router.get('/receipes/:id', async (req, res) => {
  const recipe = await mongoHandler.getRecipe(req.params.id);
  res.json(recipe);
});

router.post('/receipes', authentication, userIdCheck, async (req, res) => {
  const recipe = req.body as Recipe;
  await mongoHandler.createRecipe(recipe);
  res.json(recipe);
});

router.put('/receipes/:id', async (req, res) => {
  const recipe = req.body as Recipe;
  await mongoHandler.updateRecipe(req.params.id, recipe);
  res.json(recipe);
});

router.delete('/receipes/:id', async (req, res) => {
  await mongoHandler.deleteRecipe(req.params.id);
  res.json();
});

export default router;
