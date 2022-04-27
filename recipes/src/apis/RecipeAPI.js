const baseUrl = 'http://localhost:8000/api/recipe/recipe/'

const _requestFetch = (url, options = {}, returnData = true) => {
  const abortController = new AbortController()
  const fetchOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      signal: abortController.signal
  }

  Object.keys(options).map(key => fetchOptions[key] = options[key])

  return fetch(url, fetchOptions)
    .then(res => {
      if (!res.ok) {
        throw Error('Could not complete the operation')
      }

      if (returnData) {
        return res.json()
      } else {
        return true
      }
    })
    .catch(e => {
      if (e.name !== 'AbortError') {
        throw e
      }
    })
}

export const getRecipes = (name)  => {
  let url = baseUrl
  if (name) {
    url += `?name=${name}`
  }

  return _requestFetch(url)
}

export const getRecipe = (id) => {
  let url = `${baseUrl}${id}/`
  return _requestFetch(url)
}

export const createRecipe = (data) => {
  let url = baseUrl
  let options = {
    method: 'POST',
    body: JSON.stringify(data)
  }

  return _requestFetch(url, options)
}

export const updateRecipe = (id, data) => {
  let url = `${baseUrl}${id}/`
  let options = {
    method: 'PUT',
    body: JSON.stringify(data)
  }

  return _requestFetch(url, options)
}

export const deleteRecipe = (id) => {
  let url = `${baseUrl}${id}/`
  return _requestFetch(url, { method: 'DELETE'}, false)
}
