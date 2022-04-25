import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getRecipes } from "../../apis/RecipeAPI";
import { Button, ButtonBox, MainSection } from "../Common";
import RecipeListElements from "./RecipeListElements";

const RecipeList = () => {
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState(null)
  const [isPending, setPending] = useState(true)
  const [error, setError] = useState(null)

  const fetchRecipes = (name) => {
    setPending(true)
    setError(null)
    setRecipes(null)

    getRecipes(name).then(data => {
      setPending(false)
      setRecipes(data)
    }).catch(e => {
      setPending(false)
      setError(e.message)
    })
  }

  const handleSearch = () => {
    fetchRecipes(search)
  }

  useEffect(() => {
    fetchRecipes()
  },[])

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