import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@igreen/input';
import { Label } from '@igreen/label';

const meta = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'file'],
        },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: 'text',
        placeholder: 'Email',
    },
};

export const File: Story = {
    args: {
        type: 'file',
    },
};

export const Disabled: Story = {
    args: {
        type: 'text',
        placeholder: 'Disabled input',
        disabled: true,
    },
};

export const WithLabel: Story = {
    render: (args) => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" {...args} />
        </div>
    ),
};

export const WithButton: Story = {
    render: (args) => (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" {...args} />
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Subscribe
            </button>
        </div>
    ),
};
