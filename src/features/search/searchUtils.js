import { createSelector } from '@reduxjs/toolkit'
import { useGetIiifContentSearchQuery } from './searchApiSlice'

export const selectSearchObject = createSelector(
  (result) => result.data,
  (data) => ({
    annotations: data?.resources ?? [],
    hits: data?.hits ?? [],
    numTotal: data?.hits?.length ?? 0
  })
)

export function enhanceIiifContentSearchQueryResults(result) {
    return {
        ...result,
        search: selectSearchObject(result),
    }
}

export function useIiifContentSearchQuery({ endpoint, query }, options) {
  return useGetIiifContentSearchQuery({ endpoint, query }, { skip: query?.length === 0, selectFromResult: enhanceIiifContentSearchQueryResults, ...options })
}

export function useIiifContentSearchEndpoint() {
    return "https://contentsearch.stanford.edu/fg165hz3589/search";
}
