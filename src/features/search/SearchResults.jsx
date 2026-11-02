import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addOrUpdateSearch } from "./searchSlice"
import { useIiifContentSearchQuery, useIiifContentSearchEndpoint } from './searchUtils'


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

export const SearchResults = ({ id }) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => (state.search[id] ?? {}).query ?? "");

  const endpoint = useIiifContentSearchEndpoint();
  const debouncedQuery = useDebounce(query, 300);

  // Using a query hook automatically fetches data and returns query values
  const { search: { hits, annotations, numTotal }, isError, isLoading, isSuccess } =
    useIiifContentSearchQuery({ endpoint, query: debouncedQuery })

  return (
    <div>
      <input type="text" placeholder="Search..." value={query} onChange={e => dispatch(addOrUpdateSearch({ id: id, endpoint: endpoint, query: e.target.value }))} />

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
