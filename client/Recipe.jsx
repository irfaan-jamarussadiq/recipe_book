import "./Recipe.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Recipe({ recipe, deleteRecipeFromView, setError }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const navigate = useNavigate();

  const recipeLink = recipe.name.toLowerCase().replace(" ", "-");

  async function deleteRecipe(recipe) {
    // Send DELETE request to server with recipe as payload.
    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "DELETE",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.status === 404) {
        // If recipe to delete does not exist somehow
        setError("Recipe does not exist");
      } else if (response.status === 200) {
        // If recipe was deleted successfully, remove from view
        deleteRecipeFromView(recipe);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function editRecipe(recipe) {
    navigate(`/edit/${recipeLink}`, { state: recipe });
  }

  function confirmDeletion(recipe) {
    let status = confirm("Delete recipe?");
    if (status) {
      deleteRecipe(recipe);
    }
  }

  function viewInstructions(recipe) {
    navigate(`/instructions/${recipeLink}`, { state: recipe });
  }

  return (
    <div className="Recipe card" tabIndex="0">    
      <div className="heading-container">
        <button
          onClick={() => setShowMoreOptions(!showMoreOptions)}
          className="more-options"
        >
          <img src="more.svg" alt="More Options" />
        </button>      
        <h2 className="recipe-name">{recipe.name}</h2>
        {showMoreOptions && (
          <ul className="recipe-options-list">
            <li className="recipe-option">
              <a className="edit" onClick={() => editRecipe(recipe)}>
                Edit
              </a>
            </li>
            <li className="recipe-option">
              <a className="delete" onClick={() => confirmDeletion(recipe)}>
                Delete
              </a>
            </li>
          </ul>
        )}
      </div>
      <div className="image-container">
        <img src={`images/${recipe.imageName}.jpg`} alt={recipe.imageAlt} />
      </div>
      <p className="description">{recipe.description}</p>
      <div className="recipe-actions">
        <button className="recipe-action btn" onClick={() => viewInstructions(recipe)}>
          Instructions
        </button>
      </div>
    </div>
  );
}

export default Recipe;
