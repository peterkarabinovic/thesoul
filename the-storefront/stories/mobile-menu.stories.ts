import type { Meta, StoryObj } from '@storybook/react';

import MobileMenu from 'components/layout/header/mobile-menu';

const meta = {
    title: 'Components/MobileMenu',
    component: MobileMenu
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        menu: [
            {
                title: 'Home',
                path: '/'
            },
            {
                title: 'About',
                path: '/about'
            },
            {
                title: 'Contact',
                path: '/contact'
            }
        ]
    }
};

