import { useStore } from "@nanostores/solid";
import { createSignal, onMount, Show } from "solid-js";
import { $lightbox } from "../../stores/lightbox";
import ProductView from "./ProductView";
import ThumbnailTrail from "./ThumbnailTrail";

export default function DesktopLightbox() {
  const lightbox = useStore($lightbox);
  const [index, setIndex] = createSignal(0);
  const [ignited, setIgnited] = createSignal(false);

  onMount(() => {
    setIgnited(true);
  });

  return (
    <Show when={ignited() && lightbox()}>
      <div class="fixed left-0 top-0 z-10 hidden h-full w-full items-center justify-center bg-black bg-opacity-75 xl:flex">
        <div class="flex flex-col gap-10" onClick={() => {}}>
          <div class="flex w-[33rem] flex-col items-end gap-6">
            <button
              class="size-5 fill-white hover:fill-p-orange"
              aria-label="Close lightbox"
              onClick={() => $lightbox.set(false)}
            >
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                  fill-rule="evenodd"
                />
              </svg>
            </button>

            {/* Containing the image */}
            <div class="w-full rounded-xl">
              <ProductView index={index()} />
            </div>
          </div>
          <ThumbnailTrail index={index()} setIndex={setIndex} around />
        </div>
      </div>
    </Show>
  );
}
