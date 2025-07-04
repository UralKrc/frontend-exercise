import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/schema";
import type { GetItemsResponse } from "../../types/graphql";

export default function DataFetcher() {
  const { loading, error, data } = useQuery<GetItemsResponse>(GET_ITEMS);

  if (loading) {
    console.log("⏳ Loading items with GraphQL...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("GraphQL Error:", error);
    return <div>Error loading data</div>;
  }

  if (data?.items) {
    console.log("GraphQL fetch successful!");
    console.log("Total items:", data.items.length);

    const cleanItems = data.items.map(({ id, name, category }) => ({
      id,
      name,
      category,
    }));

    console.log("Clean items data:", cleanItems);
    console.log("Categories found:", [
      ...new Set(cleanItems.map((item) => item.category)),
    ]);
  }

  return (
    <div>
      <h1>GraphQL Data Fetched</h1>
      <p>Check console for data logs</p>
    </div>
  );
}
