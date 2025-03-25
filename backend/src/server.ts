import express from 'express';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  // TODO: Add a basic html page with info, or redirect to frontend project url
  res.send('Swift Reader API is running here');
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app, server };
