import type { Meta, StoryObj } from '@storybook/react';
import { ExampleCard } from '@igreen/example-card';

const meta = {
    title: 'System/ExampleCard',
    component: ExampleCard,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        variant: {
            control: 'select',
            options: ['default', 'outline', 'elevated', 'ghost', 'primary'],
        },
    },
} satisfies Meta<typeof ExampleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Example Card',
        description: 'This is an example card component from the system layer.',
        variant: 'default',
    },
};

export const Outline: Story = {
    args: {
        title: 'Outline Card',
        description: 'This card has an outline variant.',
        variant: 'outline',
    },
};

export const Elevated: Story = {
    args: {
        title: 'Elevated Card',
        description: 'This card uses shadow elevation.',
        variant: 'elevated',
    },
};

export const Primary: Story = {
    args: {
        title: 'Primary Card',
        description: 'This card uses primary colors.',
        variant: 'primary',
    },
};
