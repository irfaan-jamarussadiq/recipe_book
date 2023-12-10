import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function RecipeInstructions() {
  const { state: recipe } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  
  function fetchIngredients(recipe) {
    // Make GET request to RecipeIngredients table.
    // If GET request succeeds, return 200 HTTP status code from server.
    // If it fails, returns 404 status code from server.
  }

  function fetchInstructions(recipe) {
    // Make GET request to RecipeInstructions table.
    // If GET request succeeds, return 200 HTTP status code from server.
    // If it fails, returns 404 status code from server.    
  }

  return (
    <div className="card">
      <h2>{recipe.name}</h2>
      <h3>Ingredients</h3>
      {ingredients.length ? (
        <ul>
          {ingredients.map(ingredient => <li>{ingredient}</li>)}
        </ul>
      ) : "No ingredients yet. Add them here!"}      
      <h3>Instructions</h3>
      {instructions.length ? (
        <ul>
          {instructions.map(instruction => <li>{instruction}</li>)}
        </ul>
      ) : "No instructions yet. Add them here!"}      
    </div>
  );
}

export default RecipeInstructions;
