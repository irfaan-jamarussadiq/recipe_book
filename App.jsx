import "./App.css";
import Recipe from "./Recipe.jsx";
import { useState, useEffect } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);

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

  return (
    <div className="App">
      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <Recipe key={recipe.name} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default App;