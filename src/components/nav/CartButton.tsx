import IconCart from "../icons/IconCart";
import { createSignal, onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import CartDialog from "./CartDialog";

export default function CartButton() {
  let cartButton: HTMLButtonElement | undefined;

  const [showCart, setShowCart] = createSignal(false);

  // $cart is a persistent atom. There will be hydration mismatches if we try to
  // access $cart before it's mounted (prerendering on server).
  const [ignited, setIgnited] = createSignal(false);

  function keyHandler(e: KeyboardEvent) {
    if (e.key === "c") setShowCart(!showCart());
  }

  // Register "c" key to toggle cart visibility.
  onMount(() => {
    if (isServer) return;

    setIgnited(true);
    document.addEventListener("keydown", keyHandler);
  });

  // Cleanup event listener.
  onCleanup(() => {
    if (isServer) return;

    document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div class="flex h-fit w-fit items-center justify-center xl:relative">
      <button onClick={() => setShowCart(!showCart())} ref={cartButton}>
        <IconCart />
      </button>

      <CartDialog show={showCart()} />
    </div>
  );
}
