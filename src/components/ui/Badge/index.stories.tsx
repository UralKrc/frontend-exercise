import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "./.";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    outline: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "42",
    variant: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    children: "New",
    variant: "secondary",
    size: "medium",
  },
};

export const Outline: Story = {
  args: {
    children: "Beta",
    variant: "primary",
    size: "medium",
    outline: true,
  },
};

export const Small: Story = {
  args: {
    children: "5",
    variant: "primary",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Premium",
    variant: "success",
    size: "large",
  },
};
