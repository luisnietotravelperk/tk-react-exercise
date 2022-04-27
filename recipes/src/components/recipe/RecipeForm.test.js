import { fireEvent, render, screen } from "@testing-library/react";
import { createRecipe } from "../../apis/RecipeAPI";
import RecipeForm from "./RecipeForm";
import { BrowserRouter } from "react-router-dom";

jest.mock('../../apis/RecipeAPI')

describe('<RecipeForm />', () => {
  it('Create a recipe', async () => {
    const recipe = {
      name: 'recipe 1',
      description: 'Lorem ipsum',
      ingredients: [
        { name: 'ingredient 1' },
      ]
    }
    const savedRecipe = { id: 1, ...recipe}

    createRecipe.mockResolvedValueOnce(Promise.resolve(savedRecipe))

    render(
      <BrowserRouter>
        <RecipeForm />
      </BrowserRouter>
    )

    const inputName = screen.getByLabelText('input-name')
    const inputDescription = screen.getByLabelText('input-description')
    const inputIngredient = screen.getByLabelText('input-ingredient')
    const buttonAddingredient = screen.getByLabelText('button-add-ingredient')
    const buttonSave = screen.getByLabelText('button-save')

    fireEvent.change(inputName, { target: { value: recipe.name }})
    fireEvent.change(inputDescription, { target: { value: recipe.description }})
    fireEvent.change(inputIngredient, { target: { value: recipe.ingredients[0].name }})
    fireEvent.click(buttonAddingredient)
    fireEvent.click(buttonSave)

    await screen.findByText('Save')

    expect(createRecipe).toHaveBeenCalledTimes(1)
    expect(createRecipe).toHaveBeenCalledWith(recipe)
  })
})