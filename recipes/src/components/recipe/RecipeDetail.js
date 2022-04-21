import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button, ButtonBox, MainSection } from "../Common";

const RecipeDetail = () => {
  let params = useParams()

  // Get the information of the recipe
  const baseUrl = `http://localhost:8000/api/recipe/recipe/${params.recipeId}/`
  const { data: recipe, isPending, error } = useFetch(baseUrl)

  return (
    <MainSection>
      { error && <div>{error}</div>}
      { isPending && <div>Loading...</div>}
      { recipe && (
        <section>
          <h1>{recipe.name}</h1>
          <h2>Description</h2>
          <p>{recipe.description}</p>
          <h2>Ingredients</h2>
          { recipe.ingredients.length > 0 && recipe.ingredients.map(m => (
            <li key={m.id}>{m.name}</li>
          )) }
          { recipe.ingredients.length === 0 && (
            <li>Not ingredients were register</li>
          )}
          <ButtonBox>
            <Button>Delete</Button>
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