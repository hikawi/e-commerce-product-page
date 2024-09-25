import { createSignal, onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { $lightbox } from "../../stores/lightbox";
import ProductView from "../lightbox/ProductView";
import ThumbnailTrail from "../lightbox/ThumbnailTrail";

export default function DesktopProductImage() {
  const [index, setIndex] = createSignal(0);

  // Desktop image gallery shortcuts.
  function handleKeydown(event: KeyboardEvent) {
    // Prevent the default behavior of the arrow keys if the lightbox is on.
    if ($lightbox.get()) return;

    switch (event.key) {
      case "ArrowLeft":
        setIndex(Math.max(index() - 1, 0));
        break;
      case "ArrowRight":
        setIndex(Math.min(index() + 1, 3));
        break;
      case "l":
      case "L":
        $lightbox.set(true);
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
    <div class="hidden h-full w-full flex-col gap-8 xl:flex">
      <ProductView index={index()} openLightbox />
      <ThumbnailTrail index={index()} setIndex={setIndex} />
    </div>
  );
}
