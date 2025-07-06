export interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}
