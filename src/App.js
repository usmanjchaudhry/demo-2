import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfileCreation from './ProfileCreation';
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
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIngredientChange = (event) => {
    setSelectedIngredients([...event.target.selectedOptions].map(option => option.value));
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const allItems = ARRAY_OF_RECIPES;

  const filterRecipes = () => {
    const filteredItems = allItems.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedIngredients.length === 0 || selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient))) &&
      (selectedType === '' || recipe.type === selectedType)
    );
    setDisplayedItems(filteredItems);
    setCurrentPage(1);
  };

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
          <button onClick={filterRecipes} className="search-button">Search</button>
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
      <ul>
        {displayedItems.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.name}</h3>
            <p>Type: {recipe.type}</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            {(index === 1 || index === 4) && <EmbedVideo videoUrl="https://v.ftcdn.net/02/65/91/66/700_F_265916661_vAyKtkaCC6mXN8GQBiOudI1pKueez73k_ST.mp4" />}
          </li>
        ))}
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
          width: 60%;
          max-width: 300px;
          padding: 10px;
          margin: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
        }

        .search-button {
          padding: 10px;
          margin: 10px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
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

