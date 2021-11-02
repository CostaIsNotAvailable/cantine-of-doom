import { Recipe } from "../../models";

export interface IMongoHandler {
  init(): Promise<void>;
  getRecipes(): Promise<Recipe[]>;
  getRecipe(id: string): Promise<Recipe>;
  createRecipe(recipe: Recipe): Promise<Recipe>;
  updateRecipe(id: string, recipe: Recipe): Promise<Recipe>;
  deleteRecipe(id: string): Promise<boolean>;
}
