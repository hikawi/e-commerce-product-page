import { For, type Setter } from "solid-js";
import thumbnail1 from "../../assets/image-product-1-thumbnail.jpg";
import thumbnail2 from "../../assets/image-product-2-thumbnail.jpg";
import thumbnail3 from "../../assets/image-product-3-thumbnail.jpg";
import thumbnail4 from "../../assets/image-product-4-thumbnail.jpg";

const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4];

export default function ThumbnailTrail(props: {
  index: number;
  setIndex: Setter<number>;
  around?: boolean;
}) {
  return (
    <div
      class="flex flex-row items-center gap-8"
      classList={{
        "justify-around": props.around,
        "justify-center w-full": !props.around,
      }}
    >
      <For each={thumbnails}>
        {(thumbnail, idx) => (
          <button
            aria-label={`Switch to picture number ${idx()}`}
            onClick={() => props.setIndex(idx())}
            class="relative size-20 cursor-pointer rounded-xl after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:bg-white after:content-['']"
            classList={{
              "hover:after:opacity-50 after:opacity-0": props.index !== idx(),
              "after:opacity-75 ring-2 ring-p-orange": props.index === idx(),
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
  );
}
