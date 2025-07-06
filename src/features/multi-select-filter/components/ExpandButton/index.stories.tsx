import type { Meta, StoryObj } from "@storybook/react-vite";
import ExpandButton from "./.";

const meta: Meta<typeof ExpandButton> = {
  title: "MultiSelectFilter/ExpandButton",
  component: ExpandButton,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1e293b" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isExpanded: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    isExpanded: false,
  },
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
};
