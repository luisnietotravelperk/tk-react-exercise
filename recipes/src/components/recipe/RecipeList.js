import { useState } from "react";
import { Outlet } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button, ButtonBox, MainSection } from "../Common";
import RecipeListElements from "./RecipeListElements";

const RecipeList = () => {
  const baseUrl = 'http://localhost:8000/api/recipe/recipe/'
  const [url, setUrl] = useState(baseUrl)
  const [search, setSearch] = useState('')
  const { data: recipes, isPending, error } = useFetch(url)

  const handleSearch = () => {
    fetchRecipes(search)
  }

  const fetchRecipes = (name) => {
    let finalUrl = baseUrl
    if (name) {
      finalUrl = `${finalUrl}?name=${name}`
    }

    setUrl(finalUrl)
  }
  return (
    <MainSection>
      <h1>Recipes</h1>

      <section>
        <h2>Search</h2>
        <div style={{display:"flex"}}>
          <span>Name:</span>
          <input
            type="text" placeholder="Recipe name" value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{flexGrow: 1, marginLeft: "10px"}} />
        </div>
        <ButtonBox>
          <Button onClick={() => handleSearch()}>Search</Button>
        </ButtonBox>
      </section>

      { error && <div>{error}</div>}
      { isPending && <div>Loading...</div>}
      { recipes && <RecipeListElements recipes={recipes} /> }

      <Outlet />
    </MainSection>
  );
}

export default RecipeList;