//server.cjs
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wines',
  password: 'Perento16',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/wines', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM wines');
    const wines = result.rows;

    res.json(wines);
  } catch (error) {
    console.error('Error fetching wines:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Placeholder for adding a new wine to the database
app.post('/api/wines', async (req, res) => {
  try {
    // Implement code to add a new wine to the database using pool.query
    const wineData = req.body;
    const result = await pool.query('INSERT INTO wines (name, year, type, varietal, rating, consumed, date_consumed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [wineData.name, wineData.year, wineData.type, wineData.varietal, wineData.rating, wineData.consumed, wineData.dateConsumed]);
    const newWine = result.rows[0];

    // Fetch the updated list of wines and send it as a response
    const updatedResult = await pool.query('SELECT * FROM wines');
    const updatedWines = updatedResult.rows;
    res.json({ newWine, wines: updatedWines });
  } catch (error) {
    console.error('Error adding wine:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Placeholder for updating a wine in the database
app.put('/api/wines/:id', async (req, res) => {
  try {
    // Implement code to update a wine in the database using pool.query
    const wineId = req.params.id;
    // Parse updated wine data from req.body
    const updatedWineData = req.body;
    const result = await pool.query('UPDATE wines SET name = $1, year = $2, type = $3, varietal = $4, rating = $5, consumed = $6, date_consumed = $7 WHERE id = $8 RETURNING *', [updatedWineData.name, updatedWineData.year, updatedWineData.type, updatedWineData.varietal, updatedWineData.rating, updatedWineData.consumed, updatedWineData.dateConsumed, wineId]);
    const updatedWine = result.rows[0];
    res.json(updatedWine);
  } catch (error) {
    console.error('Error updating wine:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Placeholder for deleting a wine from the database
app.delete('/api/wines/:id', async (req, res) => {
  try {
    // Implement code to delete a wine from the database using pool.query
    const wineId = req.params.id;
    await pool.query('DELETE FROM wines WHERE id = $1', [wineId]);
    res.json({ message: 'Wine deleted successfully' });
  } catch (error) {
    console.error('Error deleting wine:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});