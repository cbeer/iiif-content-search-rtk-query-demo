import { createSelector } from '@reduxjs/toolkit'
import { useGetIiifContentSearchInfiniteQuery } from './searchApiSlice'

const emptyArray = []

export const selectSearchObject = createSelector(
  (result) => result.data?.pages ?? emptyArray,
  (pages) => {
    const hits = pages?.flatMap(page => page?.hits ?? []) ?? []
    const partOf = pages[0]?.partOf ?? {}

    return {
      annotations: pages?.flatMap(page => page?.resources ?? []) ?? [],
      hits,
      numTotal: partOf?.total ?? hits?.length ?? 0
    }
  }
)

export function enhanceIiifContentSearchQueryResults(result) {
    return {
        ...result,
        search: selectSearchObject(result),
    }
}

export function useIiifContentSearchQuery({ endpoint, query }, options) {
  return useGetIiifContentSearchInfiniteQuery({ endpoint, query }, { skip: query?.length === 0, selectFromResult: enhanceIiifContentSearchQueryResults, ...options })
}

export function useIiifContentSearchEndpoint() {
    return "https://contentsearch.stanford.edu/fg165hz3589/search";
}
