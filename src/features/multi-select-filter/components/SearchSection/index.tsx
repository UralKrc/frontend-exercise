import React, { useCallback, useRef, useEffect } from "react";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import Spinner from "../../../../components/ui/Spinner";
import CloseIcon from "../../../../components/ui/Icons/CloseIcon";

import type { SearchSectionProps } from "./types";

export default function SearchSection({
  searchQuery,
  onSearchChange,
  placeholder = "Search categories and items...",
  isLoading = false,
}: SearchSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      !isLoading &&
      inputRef.current &&
      document.activeElement !== inputRef.current
    ) {
      if (searchQuery.length > 0) {
        inputRef.current.focus();
        const length = searchQuery.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }
  }, [isLoading, searchQuery]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const handleClearSearch = useCallback(() => {
    onSearchChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [onSearchChange]);

  return (
    <div className="p-4 border-b border-slate-700">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          className="w-full bg-slate-800 border-slate-600 text-white placeholder-slate-400 pr-20"
        />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {isLoading && <Spinner size="small" className="text-blue-400" />}
          {searchQuery && (
            <Button
              variant="ghost"
              size="small"
              onClick={handleClearSearch}
              className="h-8 w-8 p-1 rounded-full"
              aria-label="Clear search"
            >
              <CloseIcon size={16} className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export type { SearchSectionProps } from "./types";
