import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [recipe, setRecipe] = useState({ name: "", description: "" });
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  async function createRecipe(event) {
    // Get recipes from POST url and place in database.
    const recipeImage = uploadedImage.name.substring(0, uploadedImage.name.indexOf("."));
    const recipeData = { ...recipe, imageName: recipeImage };
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (response.status === 409) {
        setFeedback("A recipe with that name already exists, please try again!");
      } else if (response.status === 201) {
        setFeedback("Recipe was created!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onRecipeChange(event) {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  }

  return (
    <div className="CreateRecipe">
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={createRecipe}
        className="recipe-form card"
      >
        {feedback && <p className="error-message">{feedback}</p>}
        <h2 className="form-title">Create a Recipe</h2>
        <div className="form-group">
          <label htmlFor="recipe-name">Recipe Name</label>
          <input
            type="text"
            id="recipe-name"
            name="name"
            placeholder="Enter a recipe name"
            value={recipe.name}
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
            onChange={e => setUploadedImage(e.target.files[0])}
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
            value={recipe.description}
            onChange={onRecipeChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <button className="submit-btn">Create Recipe</button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipe;