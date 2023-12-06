import { useLocation } from "react-router-dom";

function EditRecipe() {
  const { state: recipe } = useLocation();

  return (
    <div className="EditRecipe card">
      <h2>Edit Recipe</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" defaultValue={recipe.name} />
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input className="image-upload" type="file" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" defaultValue={recipe.description} />
        </div>
        <button className="submit-btn">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipe;
