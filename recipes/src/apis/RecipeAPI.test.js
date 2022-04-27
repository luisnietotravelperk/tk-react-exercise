import { createRecipe, getRecipe } from "./RecipeAPI";

it("get recipes correctly", async () => {
  const values = [
    { name: "recipe 1", description: "Lorem ipsun", ingredientes: [] },
    { name: "recipe 2", description: "Lorem ipsun", ingredientes: [] },
    { name: "recipe 3", description: "Lorem ipsun", ingredientes: [] },
  ]
  fetch.mockResponseOnce(JSON.stringify(values), new Response('ok', {status: 200}))
  const recipes = await getRecipe();

  expect(recipes).toHaveLength(3)
})

it("get one recipe correctly", async () => {
  const value = {
    id: 1,
    name: "recipe",
    description: "Lorem ipsum",
    ingredients: []
  }
  fetch.mockResponseOnce(JSON.stringify(value))
  const recipe = await getRecipe(1)

  expect(recipe).toBeDefined()
})

it("create a new recipe", async () => {
  const value = {
    id: 1,
    name: "recipe",
    description: "Lorem ipsum",
    ingredients: []
  }
  fetch.mockResponseOnce(JSON.stringify(value), new Response('ok', {status: 201}))
  const recipe = await createRecipe(value)

  expect(recipe).toBeDefined()
  expect(recipe.id).toEqual(1)
})

