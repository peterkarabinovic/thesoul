

import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from "components/autocomplete"

const meta = {
    title: 'Components/Autocomplete',
    component: Autocomplete
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        title: "Autocomplete",
        items: [
            "kino",
            "nimci",
            "sun",
            "joy"
        ],
        placeholder: "Kino i  nimci",
        processing: false,
        curSelected: "Petro",
        onChangeQeury: (q) => console.log("onChangeQeury",q),
        onSelectItem: index => console.log("onSelectItem", index)
    }
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile2'
        },
    },
    args: Main.args
};
