import type { Meta, StoryObj } from "@storybook/react-vite";
import SelectedItemsSummary from "./.";

const meta: Meta<typeof SelectedItemsSummary> = {
  title: "MultiSelectFilter/SelectedItemsSummary",
  component: SelectedItemsSummary,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1e293b" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onClearAll: { action: "cleared all" },
    onRemoveCategory: { action: "removed category" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  args: {
    selectedCount: 15,
    categories: ["Books", "Music", "Games"],
    onClearAll: () => console.log("Clear all clicked"),
    onRemoveCategory: (category: string) =>
      console.log(`Remove category: ${category}`),
  },
};

export const SingleCategory: Story = {
  args: {
    selectedCount: 5,
    categories: ["Beauty & Care"],
    onClearAll: () => console.log("Clear all clicked"),
    onRemoveCategory: (category: string) =>
      console.log(`Remove category: ${category}`),
  },
};

export const ManyCategories: Story = {
  args: {
    selectedCount: 42,
    categories: ["Books", "Music", "Games", "Movies", "Technology", "Fashion"],
    onClearAll: () => console.log("Clear all clicked"),
    onRemoveCategory: (category: string) =>
      console.log(`Remove category: ${category}`),
  },
};

export const WithoutCallbacks: Story = {
  args: {
    selectedCount: 8,
    categories: ["Kids & Toys"],
  },
};

export const Empty: Story = {
  args: {
    selectedCount: 0,
    categories: [],
  },
};
