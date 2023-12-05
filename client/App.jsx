import "./App.css";
import Recipe from "./Recipe.jsx";
import { useState, useEffect } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    await fetch("http://localhost:3000/api/recipes")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error));
  }

  function deleteRecipe(recipe) {
    setRecipes((recipes) => recipes.filter((r) => r.name !== recipe.name));
  }

  return (
    <div className="App">
      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.name}
            recipe={recipe}
            deleteRecipeFromView={() => deleteRecipe(recipe)}
            setError={setError}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
