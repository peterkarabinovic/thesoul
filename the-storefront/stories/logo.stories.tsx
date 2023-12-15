import type { Meta, StoryObj } from '@storybook/react';

import { LogoIcon } from 'components/icons/logo';

const meta = {
  title: 'Components/Logo',
  component: LogoIcon as any
} satisfies Meta<typeof LogoIcon>;

export default meta;
type Story = StoryObj<typeof LogoIcon>;

export const LightOne: Story = {
  decorators: [
    (Story) => (
      <div className="bg-light p-8">
        <Story />
        <p className="text-dark pl-8 pt-8 font-bold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p className="text-dark px-8 py-4 text-opacity-90">
          Онлайн-магазин подарунків "TheSoul" - це віртуальне простір, де розкривається мистецтво
          створення унікальних подарунків. При переході на сайт вас зустрічає атмосфера тепла і
          творчості. З різнобарвними екранами, прикрашеними креативними упаковками та вишуканими
          декоративними елементами, TheSoul миттєво переносить вас у світ захоплюючих можливостей
          для подарунків.
        </p>
      </div>
    )
  ],
  args: {
    className: 'fill-dark h-5'
  }
};

export const LightTwo: Story = {
  decorators: [
    (Story) => (
      <div className="bg-light p-8">
        <Story />
      </div>
    )
  ],
  args: {
    className: 'fill-primary h-5'
  }
};

export const DarkOne: Story = {
  decorators: [
    (Story) => (
      <div className="bg-dark p-8">
        <Story />
      </div>
    )
  ],
  args: {
    className: 'fill-light h-5'
  }
};

export const DarkTwo: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8">
        <Story />
      </div>
    )
  ],
  args: {
    className: 'fill-white h-5'
  }
};
