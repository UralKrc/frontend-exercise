import type { Meta, StoryObj } from "@storybook/react-vite";
import ItemRow from "./.";

const meta: Meta<typeof ItemRow> = {
  title: "MultiSelectFilter/ItemRow",
  component: ItemRow,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1e293b" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isSelected: {
      control: "boolean",
    },
    onToggle: { action: "toggled" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockItem = {
  id: "1",
  name: "Literatuur & Romans",
  category: "Books",
};

export const Unselected: Story = {
  args: {
    item: mockItem,
    isSelected: false,
    onToggle: () => console.log("Item toggled"),
  },
};

export const Selected: Story = {
  args: {
    item: mockItem,
    isSelected: true,
    onToggle: () => console.log("Item toggled"),
  },
};

export const LongName: Story = {
  args: {
    item: {
      id: "2",
      name: "Very Long Item Name That Might Wrap To Multiple Lines",
      category: "Books",
    },
    isSelected: false,
    onToggle: () => console.log("Item toggled"),
  },
};
