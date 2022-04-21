import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, MainSection } from "../Common";

// const newRecipe = () => {
//   return {
//     name: '',
//     description: '',
//     ingredients: []
//   }
// }

const RecipeForm = () => {
  let params = useParams()
  const recipeId = params.recipeId
  const title = recipeId
    ? 'Update a recipe'
    : 'Create a recipe'
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [ingredientInput, setIngredientInput] = useState('')

  const addIngredient = () => {
    const ingredient = { name: ingredientInput }
    ingredients.push(ingredient)

    setIngredients(ingredients)
    setIngredientInput('')
  }

  const deleteIngredient = (index) => {
    ingredients.splice(index, 1)
    setIngredients(ingredients)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <MainSection>
      <h1>{title}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Descrition</label>
        <textarea cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <label>Ingredients</label>
        <input type="text" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} />
        <Button onClick={() => addIngredient()}>Add</Button>

        <div>
          {ingredients.map((m, index) => (
            <span key={index}>
              {m.name}
              <i onClick={() => deleteIngredient(index)}>X</i>
            </span>
          ))}
        </div>
      </form>
    </MainSection>
  );
}

export default RecipeForm;