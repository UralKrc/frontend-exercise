import React, { useState, useMemo } from "react";
import { cn } from "../../utils/cn";
import {
  useItemsData,
  useMultiSelect,
  usePersistedSelection,
} from "../../hooks";
import type { Item } from "../../types/graphql";
import Spinner from "../../components/ui/Spinner";
import Typography from "../../components/ui/Typography";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import SelectedItemsSummary from "./components/SelectedItemsSummary";
import CategoryItem from "./components/CategoryItem";
import SearchSection from "./components/SearchSection";
import type { MultiSelectFilterProps } from "./types";

export default React.forwardRef<HTMLElement, MultiSelectFilterProps>(
  function MultiSelectFilter(
    {
      onSelectionChange,
      placeholder = "Search categories and items...",
      className,
      storageKey = "multiselect-selected-items",
    },
    ref
  ) {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
      new Set()
    );
    const [mobileView, setMobileView] = useState<"filter" | "selected">(
      "filter"
    );

    const {
      items,
      searchResults,
      loading,
      error,
      isSearching,
      isSearchLoading,
    } = useItemsData({
      searchQuery,
    });

    const {
      selectedItems,
      toggleItem,
      isSelected,
      selectedCount,
      setSelected,
    } = useMultiSelect<Item>([], (item) => item.id);

    usePersistedSelection({
      items,
      selectedItems,
      setSelected,
      onSelectionChange,
      storageKey,
      getId: (item) => item.id,
    });

    const categoryGroups = useMemo(() => {
      const hasSearchResults = searchResults.length > 0;
      const displayItems =
        isSearching && hasSearchResults ? searchResults : items;

      const groups: Record<string, Item[]> = {};

      displayItems.forEach((item) => {
        const category = item.category || "Other";
        if (!groups[category]) groups[category] = [];
        groups[category].push(item);
      });

      return groups;
    }, [isSearching, searchResults, items]);

    const mainCategories = Object.keys(categoryGroups).sort();
    const selectedItemsSet = new Set(selectedItems.map((item) => item.id));
    const selectedCategories = [
      ...new Set(
        selectedItems
          .map((item) => item.category)
          .filter((cat): cat is string => !!cat)
      ),
    ];

    const toggleCategory = (category: string) => {
      setExpandedCategories((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(category)) {
          newSet.delete(category);
        } else {
          newSet.add(category);
        }
        return newSet;
      });
    };

    const selectAllInCategory = (category: string) => {
      const categoryItems = categoryGroups[category] || [];
      const unselectedItems = categoryItems.filter((item) => !isSelected(item));
      if (unselectedItems.length > 0) {
        setSelected([...selectedItems, ...unselectedItems]);
      }
    };

    const deselectAllInCategory = (category: string) => {
      const categoryItems = categoryGroups[category] || [];
      const categoryItemIds = new Set(categoryItems.map((item) => item.id));
      setSelected(
        selectedItems.filter((item) => !categoryItemIds.has(item.id))
      );
    };

    if (loading) return <Spinner />;
    if (error)
      return (
        <div className="p-4">
          <Typography variant="body" className="text-red-600">
            Error loading items. Please try again.
          </Typography>
        </div>
      );

    return (
      <aside
        ref={ref}
        className={cn(
          "w-full sm:w-80 h-screen bg-slate-900 border-r border-slate-700 shadow-2xl overflow-hidden",
          className
        )}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center justify-between">
              <Typography variant="h4" className="text-white font-bold">
                🎯 Multi-Select Filter
              </Typography>

              {/* Mobile Toggle Buttons */}
              <div className="flex sm:hidden bg-white/10 rounded-lg p-1 gap-1">
                <Button
                  variant={mobileView === "filter" ? "primary" : "ghost"}
                  size="small"
                  onClick={() => setMobileView("filter")}
                  className="flex-1 border-0 rounded"
                >
                  Filter
                </Button>
                <Button
                  variant={mobileView === "selected" ? "primary" : "ghost"}
                  size="small"
                  onClick={() => setMobileView("selected")}
                  className="flex-1 border-0 rounded whitespace-nowrap"
                >
                  Selected ({selectedCount})
                </Button>
              </div>
            </div>
          </div>

          {/* Filter View (always visible on desktop, conditional on mobile) */}
          <div
            className={cn(
              "flex-1 flex flex-col min-h-0",
              mobileView === "filter" ? "flex" : "hidden sm:flex"
            )}
          >
            {/* Search Section */}
            <div className="flex-shrink-0">
              <SearchSection
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder={placeholder}
                isLoading={isSearchLoading}
              />
            </div>

            {/* Selected Items Summary */}
            <div className="flex-shrink-0">
              <SelectedItemsSummary
                selectedCount={selectedCount}
                categories={selectedCategories}
                onClearAll={() => setSelected([])}
                onRemoveCategory={deselectAllInCategory}
              />
            </div>

            {/* Main Categories */}
            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="p-4 pb-8 sm:pb-4">
                <div className="mb-3 flex items-center justify-between">
                  <Typography variant="h5" className="text-white">
                    📋 Categories
                  </Typography>
                  <div className="flex items-center gap-2">
                    {isSearchLoading && (
                      <Spinner size="small" className="text-blue-400" />
                    )}
                    <Badge variant="secondary" size="medium">
                      {mainCategories.length}
                    </Badge>
                  </div>
                </div>

                {mainCategories.length === 0 ? (
                  <div className="flex items-center justify-center h-32 bg-slate-800/30 rounded-lg border border-slate-700">
                    <Typography color="muted" className="text-slate-400">
                      🔍 No categories found
                    </Typography>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {mainCategories.map((category) => (
                      <CategoryItem
                        key={category}
                        category={category}
                        items={categoryGroups[category] || []}
                        selectedItems={selectedItemsSet}
                        isExpanded={expandedCategories.has(category)}
                        onToggleExpanded={() => toggleCategory(category)}
                        onToggleItem={toggleItem}
                        onSelectAll={() => selectAllInCategory(category)}
                        onDeselectAll={() => deselectAllInCategory(category)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Selected Items View */}
          <div
            className={cn(
              "flex-1 flex flex-col min-h-0 sm:hidden",
              mobileView === "selected" ? "flex" : "hidden"
            )}
          >
            <div className="flex-1 overflow-y-auto p-4 pb-8">
              <div className="mb-4">
                <Typography variant="h5" className="text-white mb-2">
                  📋 Selected Items
                </Typography>
                <Typography variant="body" color="muted">
                  {selectedCount} items selected from{" "}
                  {selectedCategories.length} categories
                </Typography>
              </div>

              {selectedItems.length === 0 ? (
                <div className="flex items-center justify-center h-32 bg-slate-800/30 rounded-lg border border-slate-700">
                  <Typography color="muted" className="text-slate-400">
                    No items selected yet
                  </Typography>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedCategories.map((category) => {
                    const categorySelectedItems = selectedItems.filter(
                      (item) => item.category === category
                    );
                    return (
                      <div
                        key={category}
                        className="bg-slate-800/50 rounded-lg p-4"
                      >
                        <Typography variant="h6" className="text-white mb-3">
                          {category} ({categorySelectedItems.length})
                        </Typography>
                        <div className="space-y-2">
                          {categorySelectedItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between bg-slate-700/50 rounded p-2"
                            >
                              <Typography variant="body" className="text-white">
                                {item.name}
                              </Typography>
                              <Button
                                variant="ghost"
                                size="small"
                                onClick={() => toggleItem(item)}
                                className="text-red-400 hover:text-red-300 p-1 h-auto min-h-0"
                                aria-label={`Remove ${item.name}`}
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <Button
                    variant="danger"
                    size="medium"
                    onClick={() => setSelected([])}
                    className="w-full mt-4"
                  >
                    Clear All Selections
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700 bg-slate-800/50">
            <div className="flex items-center justify-between text-sm">
              <Typography variant="caption" color="muted">
                {selectedCount} items from {selectedCategories.length}{" "}
                {selectedCategories.length === 1 ? "category" : "categories"}{" "}
                selected
              </Typography>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <Typography
                  variant="caption"
                  color="muted"
                  className="whitespace-nowrap"
                >
                  Auto-saved
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }
);
