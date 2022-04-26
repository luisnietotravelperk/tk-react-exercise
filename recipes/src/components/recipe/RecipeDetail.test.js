import { render, screen } from "@testing-library/react";
import RecipeDetail from "./RecipeDetail";
import { getRecipe } from '../../apis/RecipeAPI'
import { BrowserRouter, useParams } from "react-router-dom";


jest.mock('../../apis/RecipeAPI')
jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

describe('<RecipeDetail />', () => {
  it('Render all the information', async () => {
    const recipe = {
      id: 1,
      name: 'recipe 1',
      description: 'Lorem ipsum',
      ingredients: [
        { id: 1, name: 'ingredient 1' },
        { id: 2, name: 'ingredient 2' },
        { id: 3, name: 'ingredient 3' },
      ]
    }
    useParams.mockReturnValue({ recipeId: recipe.id })
    getRecipe.mockResolvedValueOnce(Promise.resolve(recipe))

    const { asFragment } = render(
      <BrowserRouter>
        <RecipeDetail />
      </BrowserRouter>
    )

    await screen.findByText('recipe 1')

    expect(getRecipe).toHaveBeenCalledTimes(1)
    expect(getRecipe).toHaveBeenCalledWith(recipe.id)
    expect(asFragment()).toMatchSnapshot()
  })
})