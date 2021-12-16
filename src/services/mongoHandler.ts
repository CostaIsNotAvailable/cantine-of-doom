import { Db, MongoClient, ObjectId } from 'mongodb';
import { Credentials, Recipe, User } from '../models';
import { IMongoHandler } from './interfaces';

export default class MongoHandler implements IMongoHandler {
  client: MongoClient;
  database: Db;
  // Connection URL
  url: string = 'mongodb+srv://dbCuisto:dbCuistoSecret@cluster0.xzysr.mongodb.net';
  // Database Name
  dbName: string = 'cantineOfDoom';

  constructor(url?: string, dbName?: string) {
    this.client = new MongoClient(this.url);

    if (url) {
      this.url = url;
    }

    if (dbName) {
      this.dbName = dbName;
    }

    this.database = this.client.db(this.dbName);
  }

  public async init(): Promise<void> {
    await this.client.connect();
  }

  public async getRecipes(userId?: number): Promise<Recipe[]> {
    const filter = userId ? { userId: userId.toString() } : {};
    const recipes = await this.database
      .collection('recipes')
      .find(filter)
      .map<Recipe>((d) => d as Recipe)
      .toArray();

    return recipes;
  }

  public async getRecipe(id: string): Promise<Recipe> {
    const recipe = await this.database
      .collection('recipes')
      .findOne({ _id: new ObjectId(id) })
      .then((d) => d as Recipe);

    return recipe;
  }

  public async createRecipe(recipe: Recipe): Promise<Recipe> {
    await this.database.collection('recipes').insertOne(recipe);

    return recipe;
  }

  public async updateRecipe(id: string, recipe: Recipe): Promise<Recipe> {
    const partialRecipe: Partial<Recipe> = { ...recipe };
    delete partialRecipe._id;
    await this.database.collection('recipes').updateOne({ _id: new ObjectId(id) }, { $set: partialRecipe });

    return recipe;
  }

  public async deleteRecipe(id: string): Promise<boolean> {
    return (await this.database.collection('recipes').deleteOne({ _id: new ObjectId(id) })).acknowledged;
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.database
      .collection('users')
      .find()
      .map<User>((d) => d as User)
      .toArray();

    return users;
  }

  public async createUser(user: User): Promise<Credentials> {
    await this.database.collection('users').insertOne(user);

    return user;
  }
}
