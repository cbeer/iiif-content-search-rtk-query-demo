import "./App.css"
import { SearchResults } from "./features/search/SearchResults"

export const App = () => (
  <div className="App">
    <header className="App-header" style={{ display: "flex", flexDirection: "row" }}>
      <div>
        A
        <SearchResults />
      </div>

      <div>
        B
        <SearchResults />
      </div>
    </header>
  </div>
)
