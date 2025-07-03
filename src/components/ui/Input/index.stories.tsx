import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from ".";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email address",
    placeholder: "Enter your email",
  },
};

export const Error: Story = {
  args: {
    label: "Email address",
    placeholder: "Enter your email",
    variant: "error",
    error: "Please enter a valid email address",
  },
};

export const Success: Story = {
  args: {
    label: "Email address",
    placeholder: "Enter your email",
    variant: "success",
    value: "john@example.com",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    helperText: "Must be at least 8 characters long",
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leftIcon: <span>🔍</span>,
    rightIcon: <span>✨</span>,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="small" placeholder="Small input" />
      <Input size="medium" placeholder="Medium input" />
      <Input size="large" placeholder="Large input" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="error" placeholder="Error variant" />
      <Input variant="success" placeholder="Success variant" />
    </div>
  ),
};
