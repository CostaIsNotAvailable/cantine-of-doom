import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { authentication, errorHandler } from './helpers';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  res.json({
    success: true
  });
});
app.use(routes);

// Error handling after endpoints to catch all thrown errors
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
