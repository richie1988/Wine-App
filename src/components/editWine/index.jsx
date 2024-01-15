// EditWine.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditWine() {
  const { id } = useParams();
  const [wineData, setWineData] = useState({
    name: '',
    year: '',
    type: '',
    varietal: '',
    rating: '',
    consumed: false,
    dateConsumed: '',
  });

  useEffect(() => {
    const fetchWineDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/wines/${id}`);
        setWineData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Wine not found.');
          // Handle this case (e.g., display a message to the user)
        } else {
          console.error('Error fetching wine details:', error.message);
        }
      }      
    };
  
    if (!isNaN(id) && parseInt(id) > 0) {
      fetchWineDetails();
    } else {
      console.error('Invalid wine ID.');
    }
  }, [id]);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWineData({ ...wineData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setWineData({ ...wineData, [name]: checked });
  };
  if (isNaN(id) || parseInt(id) <= 0) {
    console.error('Invalid wine ID.');
    return;
  }  
  const handleSaveChanges = async (e) => {
  e.preventDefault();

  try {
    if (id) {
      // Validate wineData before sending the request
      const isValid = validateWineData(wineData);
      if (!isValid) {
        console.error('Invalid wine data.');
        return;
      }

      // Send a PUT request to the server to update the wine
      await axios.put(`http://localhost:5000/api/wines/${id}`, wineData);

      // Redirect to the list of wines after a successful update
      window.location.href = '/list';
    }
  } catch (error) {
    console.error('Error updating wine:', error.message);
    // Handle error (display a message to the user, etc.)
  }
};

// Add a simple validation function
const validateWineData = (wineData) => {
  // Validate other fields based on your requirements
  if (!wineData.name || !wineData.year || !wineData.type) {
    return false;
  }
  return true;
};

  return (
    <div>
      <h1>Edit Wine Page</h1>
      <form onSubmit={handleSaveChanges}>
        {/* Include other fields similar to AddWine component */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditWine;
