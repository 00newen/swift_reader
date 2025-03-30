import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Swift reader API running on port ' + PORT);
  console.log(`Swift reader API running on port ${PORT}`);
});

// Add this before the server.listen() call
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

export { app, server };
