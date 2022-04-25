import { Link } from "react-router-dom";
import { ListSection } from "../Common";

const RecipeListElements = ({recipes}) => {
  // console.log('Items:', {recipes})
  return (
    <ListSection>
      {recipes.map((recipe) => (
        <Link to={ `/recipes/${recipe.id}` } key={recipe.id}>
          <div>
            <h2>{ recipe.name }</h2>
            <p>Short description: { recipe.description }</p>
          </div>
        </Link>
      ))}
      {recipes.length === 0 && (
        <div>
          Not recipes were found.
        </div>
      )}
    </ListSection>
  );
}

export default RecipeListElements;