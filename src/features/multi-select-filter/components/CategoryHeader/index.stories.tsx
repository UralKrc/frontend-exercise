import type { Meta, StoryObj } from "@storybook/react-vite";
import CategoryHeader from "./.";

const meta: Meta<typeof CategoryHeader> = {
  title: "MultiSelectFilter/CategoryHeader",
  component: CategoryHeader,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1e293b" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selectionState: {
      control: "select",
      options: ["none", "partial", "all"],
    },
    isExpanded: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const None: Story = {
  args: {
    category: "Books",
    itemCount: 42,
    selectionState: "none",
    isExpanded: false,
    onToggle: () => {},
    onSelectionChange: () => {},
  },
};

export const Partial: Story = {
  args: {
    category: "Books",
    itemCount: 42,
    selectionState: "partial",
    isExpanded: true,
    onToggle: () => {},
    onSelectionChange: () => {},
  },
};

export const All: Story = {
  args: {
    category: "Books",
    itemCount: 42,
    selectionState: "all",
    isExpanded: true,
    onToggle: () => {},
    onSelectionChange: () => {},
  },
};
