import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchSection from "./.";

const meta: Meta<typeof SearchSection> = {
  title: "MultiSelectFilter/SearchSection",
  component: SearchSection,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1e293b" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    searchQuery: {
      control: "text",
      description: "Current search query value",
    },
    onSearchChange: {
      action: "search changed",
      description: "Callback when search query changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input",
    },
    isLoading: {
      control: "boolean",
      description: "Whether search is in loading state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    searchQuery: "",
    placeholder: "Search categories and items...",
    isLoading: false,
  },
};

export const WithQuery: Story = {
  args: {
    searchQuery: "Books & Literature",
    placeholder: "Search categories and items...",
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    searchQuery: "Music",
    placeholder: "Search categories and items...",
    isLoading: true,
  },
};

export const LoadingEmpty: Story = {
  args: {
    searchQuery: "",
    placeholder: "Search categories and items...",
    isLoading: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    searchQuery: "",
    placeholder: "Type to search for products...",
    isLoading: false,
  },
};

export const Interactive: Story = {
  args: {
    searchQuery: "Games",
    placeholder: "Try typing or clearing the search...",
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Try typing in the search input or clicking the clear button to see the interactions.",
      },
    },
  },
};
