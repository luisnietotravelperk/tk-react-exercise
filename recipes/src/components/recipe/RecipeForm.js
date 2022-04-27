import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecipe, getRecipe, updateRecipe } from "../../apis/RecipeAPI";
import { Button, ButtonBox, MainSection } from "../Common";

const RecipeForm = () => {
  let params = useParams()
  let navigate = useNavigate()
  const recipeId = params.recipeId

  const title = recipeId
    ? 'Update a recipe'
    : 'Create a recipe'
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [ingredientInput, setIngredientInput] = useState('')
  const [isPending, setPending] = useState(false)
  const [error, setError] = useState(null)

  const addIngredient = () => {
    if (ingredientInput === '') {
      return;
    }

    const ingredient = { name: ingredientInput }
    setIngredients([...ingredients, ingredient])
    setIngredientInput('')
  }

  const deleteIngredient = (index) => {
    const updatedIngredients = [...ingredients.slice(0, index), ...ingredients.slice(index + 1)]
    setIngredients(updatedIngredients)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setPending(true)

    const recipe = {
      name: name,
      description: description,
      ingredients: ingredients
    }
    const promise = !recipeId
      ? createRecipe(recipe)
      : updateRecipe(recipeId, recipe)

    promise
      .then(data => {
        setPending(false)
        navigate(`/recipes/${data.id}/`)
      })
      .catch(e => {
        setError(e.message)
        setPending(false)
      })
  }

  useEffect(() => {
    if (!recipeId) {
      return
    }

    setPending(true)

    getRecipe(recipeId)
      .then(data => {
        setName(data.name)
        setDescription(data.description)
        setIngredients(data.ingredients)
        setPending(false)
      })
      .catch(e => {
        setError(e.message)
        setPending(false)
      })
  }, [recipeId])

  return (
    <MainSection>
      <h1>{title}</h1>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isPending && !error && <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name:</label>
        <input aria-label="input-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Descrition</label>
        <textarea aria-label="input-description" cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label>Ingredients</label>
        <div style={{display:"flex"}}>
          <input
            aria-label="input-ingredient" type="text" value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            style={{flexGrow: 1, marginRight: "10px"}} />
          <Button aria-label="button-add-ingredient" type="button" onClick={() => addIngredient()}>Add</Button>
        </div>

        <div className="span-content">
          {ingredients.map((m, index) => (
            <span key={index}>
              {m.name}
              <i onClick={() => deleteIngredient(index)}>X</i>
            </span>
          ))}
        </div>

        <ButtonBox>
          <Button aria-label="button-save" type="submit" style={{width: "100%"}}>Save</Button>
        </ButtonBox>
      </form>}
    </MainSection>
  );
}

export default RecipeForm;