import express from 'express';
import { Credentials, User } from '../models';
import { AuthService, MongoHandler} from '../services';

const router = express.Router();
const mongoHandler = new MongoHandler();
mongoHandler.init();
const authService = new AuthService();

router.post('/login', async (req, res) => {
  const credentials = req.body as Credentials;
  const token = await authService.login(credentials);

  if (!token) {
    throw new Error('Authentication error');
  }

  res.json(token);
});

router.post('/register', async (req, res) => {
  const user = req.body as User;
  const registeredUser = await mongoHandler.createUser(user);
  res.json(registeredUser);
});

export default router;
