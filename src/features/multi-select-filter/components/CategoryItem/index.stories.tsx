import type { Meta, StoryObj } from '@storybook/react-vite';
import CategoryItem from './.';

const meta: Meta<typeof CategoryItem> = {
  title: 'MultiSelectFilter/CategoryItem',
  component: CategoryItem,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1e293b' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onToggleExpanded: { action: 'toggle expanded' },
    onToggleItem: { action: 'toggle item' },
    onSelectAll: { action: 'select all' },
    onDeselectAll: { action: 'deselect all' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  { id: '1', name: 'Literatuur & Romans', category: 'Books' },
  { id: '2', name: 'Hobby & Vrije tijd', category: 'Books' },
  { id: '3', name: 'Kinderboeken', category: 'Books' },
  { id: '4', name: 'Studieboeken', category: 'Books' },
];

export const Collapsed: Story = {
  args: {
    category: 'Books',
    items: mockItems,
    selectedItems: new Set(),
    isExpanded: false,
    onToggleExpanded: () => console.log('Toggle expanded'),
    onToggleItem: (item) => console.log('Toggle item:', item.name),
    onSelectAll: () => console.log('Select all'),
    onDeselectAll: () => console.log('Deselect all'),
  },
};

export const Expanded: Story = {
  args: {
    category: 'Books',
    items: mockItems,
    selectedItems: new Set(),
    isExpanded: true,
    onToggleExpanded: () => console.log('Toggle expanded'),
    onToggleItem: (item) => console.log('Toggle item:', item.name),
    onSelectAll: () => console.log('Select all'),
    onDeselectAll: () => console.log('Deselect all'),
  },
};

export const PartiallySelected: Story = {
  args: {
    category: 'Books',
    items: mockItems,
    selectedItems: new Set(['1', '3']),
    isExpanded: true,
    onToggleExpanded: () => console.log('Toggle expanded'),
    onToggleItem: (item) => console.log('Toggle item:', item.name),
    onSelectAll: () => console.log('Select all'),
    onDeselectAll: () => console.log('Deselect all'),
  },
};

export const AllSelected: Story = {
  args: {
    category: 'Books',
    items: mockItems,
    selectedItems: new Set(['1', '2', '3', '4']),
    isExpanded: true,
    onToggleExpanded: () => console.log('Toggle expanded'),
    onToggleItem: (item) => console.log('Toggle item:', item.name),
    onSelectAll: () => console.log('Select all'),
    onDeselectAll: () => console.log('Deselect all'),
  },
};

export const SingleItem: Story = {
  args: {
    category: 'Music',
    items: [{ id: '1', name: 'Classical Music', category: 'Music' }],
    selectedItems: new Set(),
    isExpanded: true,
    onToggleExpanded: () => console.log('Toggle expanded'),
    onToggleItem: (item) => console.log('Toggle item:', item.name),
    onSelectAll: () => console.log('Select all'),
    onDeselectAll: () => console.log('Deselect all'),
  },
}; 