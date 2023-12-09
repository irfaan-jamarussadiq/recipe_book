import "./EditRecipe.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function EditRecipe() {
  const { state: recipe } = useLocation();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const [feedback, setFeedback] = useState("");

  async function updateRecipe(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "PUT",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldRecipeName: recipe.name, ...updatedRecipe }),
      });

      if (response.status === 204) {
        // recipe was successfully added
        setFeedback("Recipe was successfully updated.");
      } else if (response.status === 404) {
        // recipe could not be found
        setFeedback("Recipe to update was not found!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onRecipeChange(event) {
    setUpdatedRecipe({
      ...updatedRecipe,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="EditRecipe card">
      <h2>Edit Recipe</h2>
      <form onSubmit={updateRecipe}>
        {feedback && <p className="error-message">{feedback}</p>}
        <div className="form-group">
          <label htmlFor="recipe-name">Recipe Name</label>
          <input
            type="text"
            id="recipe-name"
            name="name"
            placeholder="Enter a recipe name"
            defaultValue={recipe.name}
            onChange={onRecipeChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image-upload">Upload Image</label>
          <input
            type="file"
            id="image-upload"
            name="image"
            onChange={(e) => setUploadedImage(e.target.files[0])}
            required={true}
          />
        </div>
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded recipe image" />
        )}
        <div className="form-group">
          <label htmlFor="recipe-description">Description</label>
          <textarea
            type="text"
            id="recipe-description"
            name="description"
            placeholder="Enter a short recipe description"
            defaultValue={updatedRecipe.description}
            onChange={onRecipeChange}
            required={true}
          />
        </div>
        <button className="submit btn">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipe;
