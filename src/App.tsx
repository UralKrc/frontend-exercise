import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import MultiSelectFilter from "./features/multi-select-filter";
import "./App.css";
import Typography from "./components/ui/Typography";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex h-screen bg-gray-100">
        {/* Multi-Select Filter */}
        <MultiSelectFilter />

        {/* Main Content - Hidden on mobile */}
        <div className="hidden sm:flex flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <Typography variant="h1" className="mb-6 text-gray-800">
              Multi-Select Filter Demo
            </Typography>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <Typography variant="h3" className="mb-4 text-gray-700">
                📋 Instructions
              </Typography>
              <div className="space-y-4">
                <Typography variant="body" color="secondary">
                  • Use the search bar to filter categories and items
                </Typography>
                <Typography variant="body" color="secondary">
                  • Select individual items or entire categories
                </Typography>
                <Typography variant="body" color="secondary">
                  • Your selections are automatically saved and persist across
                  page reloads
                </Typography>
                <Typography variant="body" color="secondary">
                  • View your selections in the sidebar summary
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
