import "./Recipe.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Recipe({ recipe, deleteRecipeFromView, setError }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
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
        setConfirmDelete(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function editRecipe(recipe) {
    navigate(`/edit/${recipeLink}`, { state: recipe });
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
              <a className="delete" onClick={() => setConfirmDelete(true)}>
                Delete
              </a>
            </li>
          </ul>
        )}
        <div className="delete-confirmation">
          <dialog open={confirmDelete}>
            <h2>Are you sure you want to delete this recipe?</h2>
            <button className="btn" autoFocus onClick={() => setConfirmDelete(false)}>
              Cancel
            </button>
            <button className="delete btn" onClick={() => deleteRecipe(recipe)}>
              Delete
            </button>
          </dialog>
        </div>
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
