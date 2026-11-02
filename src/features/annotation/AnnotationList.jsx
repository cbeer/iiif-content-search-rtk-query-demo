import { createSelector } from '@reduxjs/toolkit'
import { useAppSelector } from '../../app/hooks'
import { useIiifContentSearchQuery } from '../search/searchUtils'

const selectSearches = createSelector(
    state => state.search,
    searches => Object.values(searches)
)

export const AnnotationList = () => {
    const searches = useAppSelector(selectSearches)

  return (
    <div>
      <div>Annotation List Component</div>
    {searches.map((search, index) => (
        <AnnotationStuff key={index} search={search} />
    ))}
    </div>
  )
}

const AnnotationStuff = ({ search }) => {
    const { search: { hits, annotations, numTotal }, isError, isLoading, isSuccess } =
        useIiifContentSearchQuery({ endpoint: search.endpoint, query: search.query })

    return (
        <div>
            <div>Annotation Stuff Component</div>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error occurred</div>}
            {isSuccess && (
                <>
                    <div>Total Annotations: {annotations.length}</div>
                    <ul>
                        {JSON.stringify(annotations, null, 2)}
                    </ul>
                </>
            )}
        </div>
    )
}
