import { useState, useEffect } from "react"
import { createSelector } from '@reduxjs/toolkit'
import { useGetIiifContentSearchQuery } from "./searchApiSlice"

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if the value changes before the delay finishes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const selectSearchObject = createSelector(
  (result) => result.data,
  (data) => ({
    annotations: data?.annotations ?? [],
    hits: data?.hits ?? [],
    numTotal: data?.hits?.length ?? 0
  })
)

function enhanceIiifContentSearchQueryResults(result) {
    return {
        ...result,
        search: selectSearchObject(result),
    }
}

function useIiifContentSearchQuery({ endpoint, query }, options) {
  return useGetIiifContentSearchQuery({ endpoint, query }, { skip: query?.length === 0, selectFromResult: enhanceIiifContentSearchQueryResults, ...options })
}

function useIiifContentSearchEndpoint() {
    return "https://contentsearch.stanford.edu/fg165hz3589/search";
}

export const SearchResults = () => {
  const [query, setQuery] = useState("nsf")
  const endpoint = useIiifContentSearchEndpoint();
  const debouncedQuery = useDebounce(query, 300);
  // Using a query hook automatically fetches data and returns query values
  const { search: { hits, annotations, numTotal }, isError, isLoading, isSuccess } =
    useIiifContentSearchQuery({ endpoint, query: debouncedQuery })

  return (
    <div>
      <input type="text" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />

      <div>Search Results Component</div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error occurred</div>}
      {isSuccess && (
        <>
          <div>Total Hits: {numTotal}</div>
          <ul>
            {hits.map((item, index) => (
              <li key={index}>{item.before} <b>{item.match}</b> {item.after}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
