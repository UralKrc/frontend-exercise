import type { Meta, StoryObj } from "@storybook/react-vite";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ITEMS } from "../../graphql/schema";
import MultiSelectFilter from ".";

const mockItems = [
  { id: "1", name: "Literatuur & Romans", category: "Books" },
  { id: "2", name: "Muziek", category: "Music" },
  { id: "3", name: "Games", category: "Games" },
  { id: "4", name: "Computer", category: "Technology" },
];

const mocks = [
  {
    request: {
      query: GET_ITEMS,
    },
    result: {
      data: {
        items: mockItems,
      },
    },
  },
];

const meta: Meta<typeof MultiSelectFilter> = {
  title: "Components/MultiSelectFilter",
  component: MultiSelectFilter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Story />
      </MockedProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search items...",
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    placeholder: "Type to search categories...",
  },
};

export const WithSelectionHandler: Story = {
  args: {
    onSelectionChange: (selectedItems) => {
      console.log("Selected items:", selectedItems);
    },
  },
};
