// ListOfWines.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListOfWines() {
  const [wines, setWines] = useState([]);

  const fetchWines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/wines');
      setWines(response.data);
    } catch (error) {
      console.error('Error fetching wines:', error.message);
      // Handle error (display a message to the user, etc.)
    }
  };

  useEffect(() => {
    // Fetch the list of wines from the server when the component mounts
    fetchWines();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the server to delete the wine
      await axios.delete(`http://localhost:5000/api/wines/${id}`);
      // Fetch the updated list of wines after successful deletion
      fetchWines();
    } catch (error) {
      console.error('Error deleting wine:', error.message);
    }
  };

  return (
    <div>
      <h1>List of Wines Page</h1>
      <ul>
        {Array.isArray(wines) ? (
          wines.map((wine) => (
            <li key={wine.id}>
              <strong>{wine.name}</strong> 
              ({wine.year}) 
              {wine.type}
              {wine.varietal && <span> - Varietal: {wine.varietal}</span>}
              {wine.rating && <span> - Rating: {wine.rating}</span>}
              {wine.consumed && (
                <span>
                  - Consumed on: {wine.date_consumed ? new Date(wine.date_consumed).toLocaleDateString() : 'Invalid Date'}
                </span>
              )}

              {/* Buttons for editing and deleting each wine */}
              <Link to={`/edit/${wine.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(wine.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No wines to display</li>
        )}
      </ul>
    </div>
  );
}

export default ListOfWines;