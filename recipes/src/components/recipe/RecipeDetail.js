import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipe, getRecipe } from "../../apis/RecipeAPI";
import { Button, ButtonBox, MainSection } from "../Common";

const RecipeDetail = () => {
  let params = useParams()
  let navigate = useNavigate()

  const recipeId = params.recipeId
  const [recipe, setRecipe] = useState(null)
  const [isPending, setPending] = useState(true)
  const [error, setError] = useState(null)

  const handleDelete =  () => {
    deleteRecipe(recipeId)
      .then(ok => {
        if (ok) {
          navigate('/recipes')
        }
      })
      .catch(e => {
        setError(e.message)
      })
  }

  useEffect(() => {
    getRecipe(recipeId)
      .then(data => {
        setRecipe(data)
        setPending(false)
      })
      .catch(e => {
        setError(e.message)
        setPending(false)
      })
  }, [recipeId])

  return (
    <MainSection>
      { error && <div>{error}</div>}
      { isPending && <div>Loading...</div>}
      { recipe && (
        <section>
          <h1>{recipe.name}</h1>
          <h2>
            Description
            [<Link to={`/recipes/update/${recipeId}`}>Edit</Link>]
          </h2>
          <p>{recipe.description}</p>
          <h2>Ingredients</h2>
          { recipe.ingredients.length > 0 && recipe.ingredients.map(m => (
            <li key={m.id}>{m.name}</li>
          )) }
          { recipe.ingredients.length === 0 && (
            <li>Not ingredients were register</li>
          )}
          <ButtonBox>
            <Button onClick={() => handleDelete()}>Delete</Button>
            <Link to="/recipes">
              <Button>Back</Button>
            </Link>
          </ButtonBox>
        </section>
      )}
    </MainSection>
  );
}

export default RecipeDetail;