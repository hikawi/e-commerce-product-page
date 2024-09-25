import { createSignal, For, onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import thumbnail1 from "../../assets/image-product-1-thumbnail.jpg";
import product1 from "../../assets/image-product-1.jpg";
import thumbnail2 from "../../assets/image-product-2-thumbnail.jpg";
import product2 from "../../assets/image-product-2.jpg";
import thumbnail3 from "../../assets/image-product-3-thumbnail.jpg";
import product3 from "../../assets/image-product-3.jpg";
import thumbnail4 from "../../assets/image-product-4-thumbnail.jpg";
import product4 from "../../assets/image-product-4.jpg";

const images = [product1, product2, product3, product4];
const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4];

export default function DesktopProductImage() {
  const [index, setIndex] = createSignal(0);

  // Desktop image gallery shortcuts.
  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowLeft":
        setIndex(Math.max(index() - 1, 0));
        break;
      case "ArrowRight":
        setIndex(Math.min(index() + 1, images.length - 1));
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
      <img
        src={images[index()].src}
        alt="Image of the sneakers posing with random objects"
        class="rounded-xl object-contain"
      />

      <div class="flex w-full flex-row items-center justify-between gap-8">
        <For each={thumbnails}>
          {(thumbnail, i) => (
            <button
              aria-label={`Switch to picture number ${i()}`}
              onClick={() => setIndex(i())}
              class="relative size-20 cursor-pointer rounded-xl after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:bg-white after:content-['']"
              classList={{
                "hover:after:opacity-50 after:opacity-0": index() !== i(),
                "after:opacity-75 ring-2 ring-p-orange": index() === i(),
              }}
            >
              <img
                src={thumbnail.src}
                alt="Thumbnail of the sneakers"
                aria-label="Thumbnail of the sneakers"
                class="rounded-xl object-cover"
              />
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
