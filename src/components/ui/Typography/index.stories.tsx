import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from ".";

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body", "caption", "label"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "muted", "error", "success"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is default typography",
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="body">Body text for main content</Typography>
      <Typography variant="caption">
        Caption text for smaller details
      </Typography>
      <Typography variant="label">Label text for form fields</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography color="primary">Primary text color</Typography>
      <Typography color="secondary">Secondary text color</Typography>
      <Typography color="muted">Muted text color</Typography>
      <Typography color="error">Error text color</Typography>
      <Typography color="success">Success text color</Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography size="small">Small size text</Typography>
      <Typography size="medium">Medium size text</Typography>
      <Typography size="large">Large size text</Typography>
    </div>
  ),
};

export const CustomElement: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography as="div" variant="h2">
        Heading as div
      </Typography>
      <Typography as="span" variant="body">
        Body text as span
      </Typography>
      <Typography as="strong" variant="caption">
        Caption as strong
      </Typography>
    </div>
  ),
};
