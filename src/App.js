import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfileCreation from './ProfileCreation'; // Import ProfileCreation from './ProfileCreation'
import EmbedVideo from './EmbedVideo';

const ARRAY_OF_RECIPES = [
  { name: 'Hamburger', type: 'Fast Food', ingredients: ['Bun', 'Patty', 'Lettuce', 'Tomato'] },
  { name: 'Cookies', type: 'Dessert', ingredients: ['Flour', 'Sugar', 'Eggs', 'Chocolate Chips'] },
  { name: 'Hot Dogs', type: 'Fast Food', ingredients: ['Bun', 'Sausage', 'Mustard', 'Ketchup'] },
  { name: 'Chicken', type: 'Main Course', ingredients: ['Chicken', 'Salt', 'Pepper', 'Garlic'] },
  { name: 'Steaks', type: 'Main Course', ingredients: ['Steak', 'Salt', 'Pepper', 'Butter'] },
  { name: 'Others', type: 'Miscellaneous', ingredients: ['Unknown'] }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [displayText, setDisplayText] = useState('');
  const [showPizzaImage, setShowPizzaImage] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setDisplayText(event.target.value);
    setShowPizzaImage(event.target.value.toLowerCase() === 'pizza');
  };

  const handleIngredientChange = (event) => {
    setSelectedIngredients([...event.target.selectedOptions].map(option => option.value));
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const allItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedItems(allItems.slice(startIndex, endIndex));
  };

  useEffect(() => {
    paginate(currentPage);
  }, [currentPage]);

  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center', color: '#007bff' }}>Recipe Finder</h1>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {displayText && <div className="displayed-text">{displayText}</div>}
          {showPizzaImage && (
            <img src="https://thumbs.dreamstime.com/b/sketch-smiling-italian-chef-holding-pizza-his-hand-style-vector-illustration-white-background-charming-74048679.jpg" alt="Pizza" className="pizza-image" />
          )}
          <Link to="/create-profile">
            <button className="profile-button">Create Profile</button>
          </Link>
        </div>
        <div className="filters">
          <select multiple className="ingredient-select" value={selectedIngredients} onChange={handleIngredientChange}>
            {['Bun', 'Patty', 'Lettuce', 'Tomato', 'Flour', 'Sugar', 'Eggs', 'Chocolate Chips'].map(ingredient => (
              <option key={ingredient} value={ingredient}>{ingredient}</option>
            ))}
          </select>
          <select className="type-select" value={selectedType} onChange={handleTypeChange}>
            <option value="">Select Type</option>
            {['Fast Food', 'Dessert', 'Main Course', 'Miscellaneous'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <Routes>
          <Route path="/" element={<div>Welcome to Recipe Finder!</div>} />
          <Route path="/create-profile" element={<ProfileCreation />} />
        </Routes>
      </div>
      <EmbedVideo videoUrl="https://www.taxmann.com/emailer/images/CompaniesAct.mp4" /> {/* Include the EmbedVideo component */}

      <ul>
        {displayedItems.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(allItems.length / itemsPerPage)}>Next</button>
      </div>
      <style>{`
        .App {
          font-family: Arial, sans-serif;
        }

        .search-wrapper, .filters {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .search-input, .ingredient-select, .type-select {
          width: 90%;
          max-width: 500px;
          padding: 10px;
          margin: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
        }

        .displayed-text, .pagination span {
          text-align: center;
          font-size: 24px;
          color: red;
          margin: 10px 0;
        }

        .pizza-image, .profile-button {
          width: 100%;
          max-width: 300px;
          height: auto;
          margin: 20px 0;
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </Router>
  );
}

export default App;
