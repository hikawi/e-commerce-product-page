import product1 from "../../assets/image-product-1.jpg";
import product2 from "../../assets/image-product-2.jpg";
import product3 from "../../assets/image-product-3.jpg";
import product4 from "../../assets/image-product-4.jpg";
import { $lightbox } from "../../stores/lightbox";

const images = [product1, product2, product3, product4];

export default function ProductView(props: {
  index: number;
  openLightbox?: boolean;
}) {
  function handleClick() {
    if (props.openLightbox) {
      $lightbox.set(true);
    }
  }

  return (
    <img
      src={images[props.index].src}
      alt="Image of the sneakers posing with random objects"
      class="rounded-xl object-contain"
      onClick={handleClick}
    />
  );
}
