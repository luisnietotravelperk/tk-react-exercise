import { fireEvent, render, screen } from "@testing-library/react";
import RecipeList from "./RecipeList";
import { getRecipes } from '../../apis/RecipeAPI'
import { BrowserRouter } from "react-router-dom";

jest.mock('../../apis/RecipeAPI')

describe('<RecipeList />', () => {
  it('Render all the elements of the list', async () => {
    getRecipes.mockResolvedValue(Promise.resolve([
        { id: 1, name: 'recipe 1', description: 'Lorem ipsum', Ingredients: [] },
        { id: 2, name: 'recipe 2', description: 'Lorem ipsum', Ingredients: [] },
        { id: 3, name: 'recipe 3', description: 'Lorem ipsum', Ingredients: [] },
      ]))

    render(
      <BrowserRouter>
        <RecipeList />
      </BrowserRouter>
    )

    const inputSearch = screen.getByLabelText('input-search')
    const buttonSearch = screen.getByLabelText('button-search')
    const filterText = "recipe"

    fireEvent.change(inputSearch, {target: {value: filterText}})
    fireEvent.click(buttonSearch)

    // screen.logTestingPlaygroundURL()
    const recipe1 = await screen.findByText(/recipe 1/i)
    const recipe2 = await screen.findByText(/recipe 2/i)
    const recipe3 = await screen.findByText(/recipe 3/i)

    expect(recipe1).toBeInTheDocument()
    expect(recipe2).toBeInTheDocument()
    expect(recipe3).toBeInTheDocument()
  })
})
