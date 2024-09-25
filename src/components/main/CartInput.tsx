import { useStore } from "@nanostores/solid";
import { createSignal, onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { $cart } from "../../stores/cart";
import { $showCart } from "../../stores/showCart";
import IconCart from "../icons/IconCart";
import IconMinus from "../icons/IconMinus";
import IconPlus from "../icons/IconPlus";

export default function CartInput() {
  const [quantity, setQuantity] = createSignal(0);
  const [clicked, setClicked] = createSignal(false); // to prevent double clicking?

  const cart = useStore($cart);
  let submitButton: HTMLButtonElement | undefined;

  function addToCart() {
    setClicked(true);
    $cart.set(cart() + quantity());
    setQuantity(0);
    $showCart.set(true);
    setClicked(false);
  }

  // Accessibily shortcuts.
  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "+":
        setQuantity(quantity() + 1);
        break;
      case "-":
        setQuantity(Math.max(quantity() - 1, 0));
        break;
      case "Enter":
        submitButton?.click();
        break;
    }
  }

  onMount(() => {
    if (isServer) return;
    document.addEventListener("keydown", handleKeydown);
  });

  onCleanup(() => {
    if (isServer) return;
    document.removeEventListener("keydown", handleKeydown);
  });

  return (
    <div class="flex w-full flex-col items-center gap-4 xl:flex-row">
      <div class="flex h-14 w-full flex-row items-center justify-between rounded-xl bg-n-light-grayish-blue px-6 font-bold xl:w-1/3">
        <button
          onClick={() => setQuantity(Math.max(quantity() - 1, 0))}
          class="group relative disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Decrease quantity to ${Math.max(quantity() - 1, 0)}`}
          disabled={quantity() === 0}
          aria-keyshortcuts="-"
        >
          <IconMinus />

          <kbd class="absolute left-1/2 top-8 hidden -translate-x-1/2 group-focus:flex">
            -
          </kbd>
        </button>

        <span>{quantity()}</span>

        <button
          onClick={() => setQuantity(quantity() + 1)}
          aria-label={`Increase quantity to ${quantity() + 1}`}
          aria-keyshortcuts="+"
          class="group relative"
        >
          <IconPlus />

          <kbd class="absolute left-1/2 top-8 hidden -translate-x-1/2 group-focus:flex">
            +
          </kbd>
        </button>
      </div>

      <button
        onClick={addToCart}
        class="hover:bg-p-light-orange group relative flex h-14 w-full flex-row items-center justify-center gap-4 rounded-xl bg-p-orange font-bold shadow-[0px_20px_50px_-20px] shadow-p-orange disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-p-orange xl:w-2/3"
        disabled={clicked() || quantity() === 0}
        ref={submitButton}
      >
        <IconCart />
        Add to Cart
        <kbd class="absolute left-1/2 top-16 hidden -translate-x-1/2 group-focus:flex">
          Enter
        </kbd>
      </button>
    </div>
  );
}
