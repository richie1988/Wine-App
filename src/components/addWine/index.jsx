import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddWine() {
  const [wineData, setWineData] = useState({
    name: '',
    year: '',
    type: '',
    varietal: '',
    rating: '',
    consumed: false,
    dateConsumed: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWineData({ ...wineData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setWineData({ ...wineData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server to add the wine
      const response = await axios.post('http://localhost:5000/api/wines', wineData);

      // Navigate to the list of wines after successful submission
      navigate('/list');
    } catch (error) {
      console.error('Error adding wine:', error.message);
      // Handle error (display a message to the user, etc.)
    }
  };

  return (
    <div>
      <h1>Add Wine Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={wineData.name} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Year:
          <input type="number" name="year" value={wineData.year} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Type:
          <select name="type" value={wineData.type} onChange={handleInputChange} required>
            <option value="">Select Type</option>
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Rosé">Rosé</option>
            <option value="White Blend">White Blend</option>
            <option value="Red Blend">Red Blend</option>
          </select>
        </label>
        <br />
        <label>
        Varietal:
        <select name="varietal" value={wineData.varietal} onChange={handleInputChange} required>
          <option value="">Select Varietal</option>
          <option value="Cabernet Sauvignon">Cabernet Sauvignon</option>
          <option value="Merlot">Merlot</option>
          <option value="Shiraz">Shiraz</option>
          <option value="Chenin Blanc">Chenin Blanc</option>
          <option value="Sauvignon Blanc">Sauvignon Blanc</option>
          <option value="Verdelho">Verdelho</option>
          <option value="Chardonnay">Chardonnay</option>
          <option value="Durif">Durif</option>
        </select>
        </label>

        <br />
        <label>
          Rating:
          <input type="number" name="rating" value={wineData.rating} onChange={handleInputChange} min="1" max="5" />
        </label>
        <br />
        <label>
          Consumed:
          <input type="checkbox" name="consumed" checked={wineData.consumed} onChange={handleCheckboxChange} />
        </label>
        <br />
        {wineData.consumed && (
          <label>
            Date Consumed:
            <input type="date" name="dateConsumed" value={wineData.dateConsumed} onChange={handleInputChange} />
          </label>
        )}
        <br />
        <button type="submit">Add Wine</button>
      </form>
    </div>
  );
}

export default AddWine;