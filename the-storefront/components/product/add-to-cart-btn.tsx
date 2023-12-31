import clsx from 'clsx';
import { add_to_cart } from 'i18n';

type AddToCartBtnProps = {
  count?: number;
  loading?: boolean;
  addToCart: () => void;
  removeFromCart: () => void;
};

export function AddToCartBtn({ count = 0, loading, addToCart, removeFromCart }: AddToCartBtnProps) {

  if (count === 0 || loading )
    return (
        <button className="btn btn-secondary w-full rounded-xl" onClick={() => !loading && addToCart() }>
          { loading ? <span className="loading loading-ring loading-md" /> : add_to_cart }
        </button>
    );

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-secondary">
      <button className="btn btn-secondary rounded-xl" onClick={removeFromCart}>
        -
      </button>
      <span className="rounded-xl bg-secondary px-2">{count}</span>
      <button className="btn btn-secondary rounded-xl" onClick={addToCart}>
        +
      </button>
    </div>
  );
}
