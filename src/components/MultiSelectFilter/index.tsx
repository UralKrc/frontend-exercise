import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/schema";
import type { GetItemsResponse } from "../../types/graphql";
import { cn } from "../../utils/cn";
import Spinner from "../ui/Spinner";
import type { MultiSelectFilterProps, MultiSelectState } from "./types";

export default React.forwardRef<HTMLDivElement, MultiSelectFilterProps>(
  function MultiSelectFilter(
    { onSelectionChange, placeholder = "Search items...", className },
    ref
  ) {
    const [state, setState] = useState<MultiSelectState>({
      selectedItems: [],
      searchQuery: "",
      allItems: [],
    });

    const { loading, error, data } = useQuery<GetItemsResponse>(GET_ITEMS);

    // Update all items when data loads
    useEffect(() => {
      if (data?.items) {
        setState((prev) => ({ ...prev, allItems: data.items }));
        console.log("MultiSelectFilter: Loaded", data.items.length, "items");
      }
    }, [data]);

    // Notify parent of selection changes
    useEffect(() => {
      onSelectionChange?.(state.selectedItems);
    }, [state.selectedItems, onSelectionChange]);

    if (loading) return <Spinner />;

    if (error) {
      console.error("MultiSelectFilter: GraphQL Error:", error);
      return (
        <div className="p-4 text-red-600">
          Error loading items. Please try again.
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm",
          className
        )}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Multi-Select Filter
          </h2>

          {/* TODO: Selected items section */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Selected: {state.selectedItems.length} items
            </p>
          </div>

          {/* TODO: Search input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder={placeholder}
              value={state.searchQuery}
              onChange={(e) =>
                setState((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* TODO: Available items list */}
          <div className="text-sm text-gray-600">
            Available: {state.allItems.length} items
          </div>
        </div>
      </div>
    );
  }
);

export type { MultiSelectFilterProps } from "./types";
