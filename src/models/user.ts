import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    login: string;
    password: string;
}