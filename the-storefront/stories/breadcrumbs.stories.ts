import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from 'components/layout/breadcrumbs';

const meta = {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        parents: [
            {
                title: 'Головна',
                path: '/'
            },
            {
                title: 'Чоловикам',
                path: '/man'
            },
        ],
        lastTitle: 'Костюми'
    }
};

export const Long: Story = {
    args: {
        parents: [
            {
                title: 'Головна',
                path: '/'
            },
            {
                title: 'Чоловикам',
                path: '/man'
            },
            {
                title: 'Одяг',
                path: "/clothes"
            }
        ],
        lastTitle: 'Костюми'
    }
};

