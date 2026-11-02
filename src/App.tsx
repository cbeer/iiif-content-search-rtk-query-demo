import "./App.css"
import { SearchResults } from "./features/search/SearchResults"
import { AnnotationList } from "./features/annotation/AnnotationList"

export const App = () => (
  <div className="App">
    <header className="App-header" style={{ display: "flex", flexDirection: "row" }}>
      <div>
        A
        <SearchResults id="a" />
      </div>

      <div>
        B
        <SearchResults id="b" />
      </div>
    </header>
    <AnnotationList />
  </div>
)
