import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import MultiSelectFilter from "./components/MultiSelectFilter";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MultiSelectFilter
          onSelectionChange={(selectedItems) => {
            console.log("App: Selected items changed:", selectedItems);
          }}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
