import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import DataFetcher from "./components/data-fetcher/DataFetcher";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DataFetcher />
      </div>
    </ApolloProvider>
  );
}

export default App;
