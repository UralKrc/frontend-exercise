import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Item {
    id: String!
    name: String!
  }

  type Query {
    items: [Item]
    searchItems(query: String!): [Item]
  }
`;

export const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
      category
    }
  }
`;

export const SEARCH_ITEMS = gql`
  query SearchItems($query: String) {
    searchItems(query: $query) {
      id
      name
      category
    }
  }
`;
