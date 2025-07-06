import type { Meta, StoryObj } from "@storybook/react-vite";
import Tag from "./.";

const meta: Meta<typeof Tag> = {
  title: "MultiSelectFilter/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#1e293b" }],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    onRemove: { action: "removed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Books",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Music",
    variant: "secondary",
  },
};

export const WithRemove: Story = {
  args: {
    label: "Beauty & Care",
    variant: "primary",
    onRemove: () => console.log("Tag removed"),
  },
};

export const LongLabel: Story = {
  args: {
    label: "Kids & Toys Category",
    variant: "primary",
    onRemove: () => console.log("Tag removed"),
  },
};
