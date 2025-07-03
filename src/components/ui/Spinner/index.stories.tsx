import type { Meta, StoryObj } from "@storybook/react-vite";
import Spinner from ".";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    className: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const CustomColor: Story = {
  args: {
    size: "medium",
    className: "text-blue-600",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Spinner size="small" />
        <p className="mt-2 text-sm text-gray-600">Small</p>
      </div>
      <div className="text-center">
        <Spinner size="medium" />
        <p className="mt-2 text-sm text-gray-600">Medium</p>
      </div>
      <div className="text-center">
        <Spinner size="large" />
        <p className="mt-2 text-sm text-gray-600">Large</p>
      </div>
    </div>
  ),
};

export const LoadingCard: Story = {
  render: () => (
    <div className="w-64 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-center">
        <Spinner size="medium" className="text-blue-600" />
      </div>
      <p className="mt-4 text-center text-gray-600">Loading content...</p>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};

export const InlineSpinner: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner size="small" className="text-gray-500" />
      <span className="text-gray-700">Loading data...</span>
    </div>
  ),
};
