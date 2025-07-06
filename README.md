# Multi-Select Filter

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Open Storybook
npm run storybook
```

## Features

- **Multi-select filtering** with real-time search
- **GraphQL data fetching** using Apollo Client
- **Persistent selections** across page reloads (localStorage)
- **Responsive design** for desktop and mobile
- **Category grouping** with expand/collapse functionality
- **Comprehensive testing** with Vitest and React Testing Library
- **Component documentation** with Storybook

## Architecture

### Feature-Based Structure

```
src/
├── features/
│   └── multi-select-filter/     # Main filter component
├── components/ui/               # Reusable UI components
├── hooks/                       # Custom React hooks
├── services/                    # Business logic
└── utils/                       # Helper functions
```

### Key Design Decisions

**GraphQL Implementation**

- Used Apollo Client with local schema/resolvers
- Simulates real GraphQL API while working with static JSON
- Enables easy transition to actual GraphQL backend

**Data Strategy**

- Fetches all 429 items upfront for instant search/filter
- Acceptable for current dataset size
- Would implement pagination/server-side filtering for larger datasets

**Category Organization**

- Items grouped by categories (Books, Technology, etc.)
- Enhances UX with logical grouping
- Collapsible sections reduce visual clutter

**State Management**

- Custom hooks for business logic (`useMultiSelect`, `useItemsData`)
- Local state with persistence hooks
- No external state management needed for this scope

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Data**: GraphQL (Apollo Client)
- **Testing**: Vitest, React Testing Library
- **Documentation**: Storybook
- **Build**: Vite

## Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test -- --coverage

# Run specific test file
npm run test -- Button
```

Tests cover:

- Component rendering and interactions
- Custom hooks behavior
- Search and filtering logic
- Selection persistence

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook
- `npm run test` - Run tests

### Component Development

All components include:

- TypeScript interfaces
- Unit tests
- Storybook stories
- Responsive design

## Implementation Notes

### Categorization Logic

- Items are assigned to categories using a simple keyword-based confidence scoring system.
- If an item matches multiple categories, the best (highest scoring) match is chosen.
- If no good match is found, the item is placed in the "Other" category.
- To add or adjust categories, update the keyword lists in `src/constants/categories.ts`.
- This approach is easy to maintain and works well for the current dataset, but some ambiguous items may require future keyword tweaks.

### Performance Considerations

- Debounced search input (300ms)
- Virtualization not needed for current dataset size
- Efficient re-renders with proper React patterns

### Accessibility

- Keyboard navigation support
- Screen reader friendly
- ARIA labels and roles
- Focus management

### Browser Support

- Modern browsers (ES2020+)
- Mobile responsive
- Tested on Chrome, Firefox, Safari

## Assignment Requirements

✅ **Primary Requirements**

- Multi-select filter with search
- GraphQL data fetching
- TypeScript + React
- Tailwind CSS
- Component-based architecture
- Comprehensive testing

✅ **Bonus Features**

- localStorage persistence
- Responsive design
- Advanced state management
- Modern build setup (Vite)
- Storybook documentation

## Future Enhancements

- Server-side pagination for large datasets
- Advanced filtering options (date ranges, etc.)
- Drag-and-drop reordering
- Export selected items functionality
- Real-time collaboration features
