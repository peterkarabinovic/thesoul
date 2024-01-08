import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetails } from 'components/product-derails';
import * as D from '../test-data';

const meta = {
  title: 'Product/Details',
  component: ProductDetails
} satisfies Meta<typeof ProductDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  },
  args: {
    product: D.productOneVariant
  }
};

export const MobileWithVariants: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  },
  args: {
    product: D.productThreeVariants
  }
};

export const Desktop: Story = {
  args: {
    product: D.productTwoVariants
  }
};
