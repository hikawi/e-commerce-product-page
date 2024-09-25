import { useStore } from "@nanostores/solid";
import { createMemo, createSignal, onMount } from "solid-js";
import { $cart } from "../../stores/cart";

export default function CartNumber() {
  const cart = useStore($cart);
  const [ignited, setIgnited] = createSignal(false);
  const cartValue = createMemo(() => (ignited() ? cart() : 0));

  onMount(() => {
    setIgnited(true);
  });

  return (
    <div
      class="absolute -right-2 -top-2 min-w-fit items-center justify-center rounded-full bg-p-orange px-2 text-[0.625rem] font-bold text-white"
      classList={{ hidden: cartValue() === 0, flex: cartValue() !== 0 }}
    >
      {cartValue()}
    </div>
  );
}
