import express from 'express';
import { Credentials } from '../models';
import { AuthService } from '../services';

const router = express.Router();

const authService = new AuthService();

router.post('/login', async (req, res) => {
  const credentials = req.body as Credentials;
  const token = await authService.login(credentials);

  if (!token) {
    throw new Error('Authentication error');
  }

  res.json(token);
});

export default router;
