import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Recipe from './components/recipe/Recipe';
import RecipeForm from './components/recipe/RecipeForm';
import RecipeDetail from './components/recipe/RecipeDetail';
import RecipeList from './components/recipe/RecipeList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<RecipeList />} />
        <Route path='recipes' element={<Recipe />}>
          <Route index element={<RecipeList/>} />
          <Route path='list' element={<RecipeList/>} />
          <Route path=':recipeId' element={<RecipeDetail />}></Route>
          <Route path='new' element={<RecipeForm/>}></Route>
          <Route path='update' element={<RecipeForm/>}>
            <Route path=':recipeId' element={<RecipeForm />} />
          </Route>
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
