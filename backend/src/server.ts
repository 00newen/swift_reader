import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Swift Reader API is still running here');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
