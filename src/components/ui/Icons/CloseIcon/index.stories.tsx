import type { Meta, StoryObj } from "@storybook/react-vite";
import CloseIcon from "./index";

const meta: Meta<typeof CloseIcon> = {
  title: "UI/Icons/CloseIcon",
  component: CloseIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number", min: 8, max: 48, step: 2 },
      description: "Size of the icon in pixels",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 16,
  },
};

export const Small: Story = {
  args: {
    size: 12,
  },
};

export const Medium: Story = {
  args: {
    size: 20,
  },
};

export const Large: Story = {
  args: {
    size: 32,
  },
};

export const WithCustomColor: Story = {
  args: {
    size: 24,
    className: "text-red-500",
  },
};

export const InButton: Story = {
  args: {
    size: 16,
    className: "text-gray-500 hover:text-gray-700",
  },
  decorators: [
    (Story) => (
      <button className="p-2 rounded border hover:bg-gray-100 transition-colors">
        <Story />
      </button>
    ),
  ],
};
