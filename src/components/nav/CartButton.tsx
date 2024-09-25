import { useStore } from "@nanostores/solid";
import { onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { $showCart } from "../../stores/showCart";
import IconCart from "../icons/IconCart";
import CartDialog from "./CartDialog";
import CartNumber from "./CartNumber";

export default function CartButton() {
  const showCart = useStore($showCart);

  function keyHandler(e: KeyboardEvent) {
    if (e.key === "c") $showCart.set(!showCart());
  }

  // Register "c" key to toggle cart visibility.
  onMount(() => {
    if (isServer) return;
    document.addEventListener("keydown", keyHandler);
  });

  // Cleanup event listener.
  onCleanup(() => {
    if (isServer) return;
    document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div class="relative flex h-fit w-fit items-center justify-center">
      <button onClick={() => $showCart.set(!showCart())}>
        <IconCart />
      </button>

      <CartNumber />
      <CartDialog show={showCart()} />
    </div>
  );
}
