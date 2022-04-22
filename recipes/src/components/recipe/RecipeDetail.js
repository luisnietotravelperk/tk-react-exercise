import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button, ButtonBox, MainSection } from "../Common";

const RecipeDetail = () => {
  let params = useParams()
  let navigate = useNavigate()
  const recipeId = params.recipeId

  // Get the information of the recipe
  const baseUrl = `http://localhost:8000/api/recipe/recipe/${recipeId}/`
  const { data: recipe, isPending, error } = useFetch(baseUrl)

  const handleDelete =  () => {
    fetch(baseUrl, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.ok) {
        navigate('/recipes')
      }
    })
  }

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