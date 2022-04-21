import { useEffect, useState } from "react"

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()

    setError(null)

    fetch(url, { signal: abortController.signal })
      .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch the data.')
        }

        return res.json()
      })
      .then(data => {
        setData(data)
        setPending(false)
      })
      .catch(e => {
        if (e.name !== 'AbortError') {
          setError(e.message)
          setPending(false)
        }
      })
  }, [url])

  return { data, isPending, error };
}

export default useFetch;