import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonBox, MainSection } from "../Common";

// const newRecipe = () => {
//   return {
//     name: '',
//     description: '',
//     ingredients: []
//   }
// }

const RecipeForm = () => {
  let params = useParams()
  let navigate = useNavigate()

  const recipeId = params.recipeId
  const baseUrl = `http://localhost:8000/api/recipe/recipe/`
  const baseUrlUpdate = `${baseUrl}${recipeId}/`

  const title = recipeId
    ? 'Update a recipe'
    : 'Create a recipe'
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [ingredientInput, setIngredientInput] = useState('')
  const [isPending, setIsPending] = useState(false)
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

    const recipe = {
      name: name,
      description: description,
      ingredients: ingredients
    }
    const url = recipeId ? baseUrlUpdate : baseUrl
    const method = recipeId ? 'PUT' : 'POST'
    const redirect  = recipeId ? `/recipes/${recipeId}` : '/recipes'

    setError(null)

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe)
    }).then((res) => {
      if (res.ok) {
        navigate(redirect)
      } else {
        setError(res.statusText)
      }
    })
  }

  useEffect(() => {
    getRecipe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRecipe = () => {
    if (!recipeId) {
      return;
    }

    setIsPending(true)
    setError(null)

    fetch(baseUrlUpdate)
      .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch the data')
        }

        return res.json();
      })
      .then(data => {
        setName(data.name)
        setDescription(data.description)
        setIngredients(data.ingredients)
        setIsPending(false)
      })
      .catch(e => {
        if (e.name !== 'AbortError') {
          setError(e.message)
          setIsPending(false)
        }
      })
  }

  return (
    <MainSection>
      <h1>{title}</h1>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isPending && !error && <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Descrition</label>
        <textarea cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label>Ingredients</label>
        <div style={{display:"flex"}}>
          <input
            type="text" value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            style={{flexGrow: 1, marginRight: "10px"}} />
          <Button type="button" onClick={() => addIngredient()}>Add</Button>
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
          <Button type="submit" style={{width: "100%"}}>Save</Button>
        </ButtonBox>
      </form>}
    </MainSection>
  );
}

export default RecipeForm;