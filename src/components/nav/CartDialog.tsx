import { useStore } from "@nanostores/solid";
import { createSignal, Match, onMount, Switch } from "solid-js";
import thumbnail from "../../assets/image-product-1-thumbnail.jpg";
import { $cart } from "../../stores/cart";
import IconDelete from "../icons/IconDelete";

function CartContent(props: { cart: number }) {
  return (
    <>
      <div class="flex w-full items-center border-b-[1px] border-n-very-light-gray p-6">
        <h1 class="font-bold">Cart</h1>
      </div>

      <div
        class="flex h-full w-full flex-col items-center justify-center gap-6 p-6 text-n-dark-grayish-blue"
        classList={{ "py-20": props.cart == 0 }}
      >
        <Switch>
          <Match when={props.cart <= 0}>
            <p class="font-bold">Your cart is empty.</p>
          </Match>
          <Match when={props.cart > 0}>
            <div class="flex flex-row items-center justify-between gap-4">
              <div class="flex flex-row gap-4">
                <img
                  src={thumbnail.src}
                  alt={`Image of the running shoes`}
                  width="50"
                  height="50"
                  class="rounded object-contain"
                />

                <div class="flex h-full flex-col text-n-dark-grayish-blue">
                  <h1>Fall Limited Edition Sneakers</h1>
                  <p>
                    $125.00 x {props.cart}{" "}
                    <span class="font-bold text-n-very-dark-blue">
                      ${(props.cart * 125).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              <button
                aria-label="Remove from cart"
                onClick={() => $cart.set(0)}
              >
                <IconDelete />
              </button>
            </div>

            <button class="hover:bg-p-light-orange h-14 w-full rounded-xl bg-p-orange font-bold text-n-very-dark-blue">
              Checkout
            </button>
          </Match>
        </Switch>
      </div>
    </>
  );
}

export default function CartDialog(props: { show: boolean }) {
  const cart = useStore($cart);
  const [ignited, setIgnited] = createSignal(false);

  onMount(() => {
    setIgnited(true);
  });

  return (
    <>
      {/* Mobile version slides down out of the nav bar. */}
      {/* Desktop version of the cart, sliding down FROM the cart icon. */}
      <div
        class="absolute left-1/2 top-16 flex w-[22.5rem] max-w-full -translate-x-1/2 flex-col overflow-y-hidden rounded-xl bg-white shadow-xl transition-all duration-200 ease-linear motion-reduce:duration-0 xl:left-0 xl:top-10 xl:translate-y-0"
        classList={{
          "max-h-[64rem]": props.show,
          "max-h-0 invisible": !props.show,
        }}
        role="dialog"
      >
        <CartContent cart={ignited() ? cart() : 0} />
      </div>
    </>
  );
}
