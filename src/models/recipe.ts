import { ObjectId } from "bson";
import { Ingredient } from ".";

export interface Recipe {
  _id?: ObjectId;
  name: string;
  nbParts: number;
  ingredients: Ingredient[];
  steps: string[];
}
