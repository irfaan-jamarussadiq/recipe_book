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

  return (
    <div className="Recipe card" tabIndex="0">
      <div className="heading-container">
        <h2 className="recipe-name">{recipe.name}</h2>
        <button
          onClick={() => setShowMoreOptions(!showMoreOptions)}
          className="more-options"
        >
          <img src="more.svg" alt="More Options" />
        </button>
        {showMoreOptions && (
          <ul className="recipe-options-list">
            <li className="recipe-option btn">
              <a className="edit" onClick={() => editRecipe(recipe)}>
                Edit
              </a>
            </li>
            <li className="recipe-option btn">
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
      <p>{recipe.description}</p>
      <div className="recipe-actions">
        <a className="recipe-action btn" href={`/ingredients/${recipeLink}`}>
          Ingredients
        </a>
        <a className="recipe-action btn" href={`/instructions/${recipeLink}`}>
          Instructions
        </a>
      </div>
    </div>
  );
}

export default Recipe;
