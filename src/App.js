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
  const [displayText, setDisplayText] = useState('');
  const [showPizzaImage, setShowPizzaImage] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeType, setNewRecipeType] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');
  const [submittedRecipes, setSubmittedRecipes] = useState([]);

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

  const handleRecipeNameChange = (event) => {
    setNewRecipeName(event.target.value);
  };

  const handleRecipeTypeChange = (event) => {
    setNewRecipeType(event.target.value);
  };

  const handleRecipeIngredientsChange = (event) => {
    setNewRecipeIngredients(event.target.value);
  };

  const handleRecipeSubmit = (event) => {
    event.preventDefault();
    const newRecipe = {
      name: newRecipeName,
      type: newRecipeType,
      ingredients: newRecipeIngredients.split(',').map(ingredient => ingredient.trim())
    };
    setSubmittedRecipes([...submittedRecipes, newRecipe]);
    setNewRecipeName('');
    setNewRecipeType('');
    setNewRecipeIngredients('');
  };

  const filteredRecipes = ARRAY_OF_RECIPES.filter(recipe => {
    if (selectedIngredients.length > 0 && !selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient))) {
      return false;
    }
    if (selectedType !== '' && recipe.type !== selectedType) {
      return false;
    }
    if (searchTerm !== '' && !recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

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
        <h1 className="title">Recipe Finder</h1>
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
        <div className="submit-recipe">
          <h2>Submit a Recipe</h2>
          <form onSubmit={handleRecipeSubmit}>
            <input type="text" placeholder="Recipe Name" value={newRecipeName} onChange={handleRecipeNameChange} />
            <input type="text" placeholder="Recipe Type" value={newRecipeType} onChange={handleRecipeTypeChange} />
            <textarea placeholder="Recipe Ingredients (comma-separated)" value={newRecipeIngredients} onChange={handleRecipeIngredientsChange}></textarea>
            <button type="submit">Submit Recipe</button>
          </form>
        </div>
        <Routes>
          <Route path="/" element={<div>Welcome to Recipe Finder!</div>} />
          <Route path="/create-profile" element={<ProfileCreation />} />
        </Routes>
      </div>
      <EmbedVideo videoUrl="https://www.taxmann.com/emailer/images/CompaniesAct.mp4" />

      <ul className="recipe-list">
        {filteredRecipes.map((recipe, index) => (
          <li key={index} className="recipe-item">
            <h3>{recipe.name}</h3>
            <p>Type: {recipe.type}</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
          </li>
        ))}
        {submittedRecipes.map((recipe, index) => (
          <li key={index} className="recipe-item">
            <h3>{recipe.name}</h3>
            <p>Type: {recipe.type}</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Status: Pending Approval</p>
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
          max-width: 800px;
          margin: 0 auto;
        }

        .title {
          text-align: center;
          color: #007bff;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .search-input {
          width: 70%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .displayed-text {
          text-align: center;
          font-size: 18px;
          color: red;
          margin: 10px 0;
        }

        .pizza-image {
          max-width: 100px;
          height: auto;
        }

        .profile-button {
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .ingredient-select,
        .type-select {
          width: 45%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .submit-recipe {
          margin-bottom: 20px;
        }

        .submit-recipe h2 {
          text-align: center;
          margin-bottom: 10px;
        }

        .submit-recipe form {
          display: flex;
          flex-direction: column;
        }

        .submit-recipe input,
        .submit-recipe textarea {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }

        .recipe-list {
          list-style: none;
          padding: 0;
        }

        .recipe-item {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 10px;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }

        .pagination button {
          padding: 10px 20px;
          margin: 0 5px;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .pagination button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </Router>
  );
}

export default App;
