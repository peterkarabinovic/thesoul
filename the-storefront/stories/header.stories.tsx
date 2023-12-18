import type { Meta, StoryObj } from '@storybook/react';

import Header from 'components/layout/header';

const meta = {
    title: 'Components/Header',
    component: Header
} satisfies Meta<typeof Header>;


export default meta;
type Story = StoryObj<typeof meta>;


export const Mobile: Story = {
    parameters:{
        viewport:{
            defaultViewport: 'mobile2'
        } 
    },
}

export const Desktop: Story = {}