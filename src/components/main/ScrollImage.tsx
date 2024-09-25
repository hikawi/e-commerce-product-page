import { onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import IconNext from "../icons/IconNext";
import IconPrevious from "../icons/IconPrevious";

export default function ScrollImage(props: {
  left?: boolean;
  right?: boolean;
}) {
  if (!props.left && !props.right) {
    throw new Error("You must provide either 'left' or 'right' prop.");
  }

  function scroll() {
    const productImage = document.getElementById("product-scroll")!;
    let scrollVal = productImage.scrollWidth / 4;
    if (props.left) scrollVal = -scrollVal;

    // Ensure the scroll value is within the scrollable area, or it gets stuck.
    // For example, if scrollleft is -400, it would need 2 right scrolls to get to second pic.
    let scrollResult = productImage.scrollLeft + scrollVal;
    scrollResult = Math.min(scrollResult, productImage.scrollWidth);
    scrollResult = Math.max(scrollResult, 0);

    productImage.scrollTo({ left: scrollResult, behavior: "smooth" });
  }

  // Key to use arrow keys to scroll images.
  function handleKey(e: KeyboardEvent) {
    const key = props.left ? "ArrowLeft" : "ArrowRight";
    if (e.key === key) scroll();
  }

  onMount(() => {
    if (isServer) return;
    document.addEventListener("keydown", handleKey);
  });

  onCleanup(() => {
    if (isServer) return;
    document.removeEventListener("keydown", handleKey);
  });

  return (
    <button
      class="absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white stroke-n-very-dark-blue hover:stroke-p-orange xl:hidden"
      classList={{ "left-4": props.left, "right-4": props.right }}
      aria-label={props.left ? "Scroll left" : "Scroll right"}
      onClick={scroll}
    >
      {props.left ? <IconPrevious /> : <IconNext />}
    </button>
  );
}
