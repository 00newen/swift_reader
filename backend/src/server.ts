import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes.js';
import { pgPool } from './db/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

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
const server = app.listen(PORT, async () => {
  try {
    // Test database connection
    await pgPool.query('SELECT NOW()');
    console.log('Database connection successful');
    console.log(`Server running on port: ${PORT}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    pgPool.end();
  });
});

export { app, server };
