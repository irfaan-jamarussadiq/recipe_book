import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Recipe({ recipe, deleteRecipeFromView, setError }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const navigate = useNavigate();

  function hyphenate(recipeName) {
    return recipe.name.toLowerCase().replace(" ", "-");
  }

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
        <div
          className={`recipe-options ${
            showMoreOptions ? "options-shown" : "options-hidden"
          }`}
        >
          <ul className="recipe-options-list">
            <li className="recipe-option">
              <a className="edit" href={`/edit/${hyphenate(recipe.name)}`}>
                Edit
              </a>
            </li>
            <li className="recipe-option">
              <a className="delete" onClick={() => deleteRecipe(recipe)}>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="image-container">
        <img src={`images/${recipe.imageName}.jpg`} alt={recipe.imageAlt} />
      </div>
      <p className="recipe-description">{recipe.description}</p>
      <div className="recipe-actions">
        <a
          className="recipe-action"
          href={`/ingredients/${hyphenate(recipe.name)}`}
        >
          Ingredients
        </a>
        <a
          className="recipe-action"
          href={`/instructions/${hyphenate(recipe.name)}`}
        >
          Instructions
        </a>
      </div>
    </div>
  );
}

export default Recipe;
