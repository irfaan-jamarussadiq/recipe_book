import { useLocation } from "react-router-dom";

function RecipeInstructions() {
  const { state: recipe } = useLocation();

  return (
    <div className="RecipeInstructions card">
      <h2>{recipe.name}</h2>
      <div className="image-container">
        <img src={`images/${recipe.imageName}.jpg`} alt={recipe.imageAlt} />
      </div>
      <ol className="instructions-list">
        {recipe.instructions &&
          recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
      </ol>
    </div>
  );
}

export default RecipeInstructions;
