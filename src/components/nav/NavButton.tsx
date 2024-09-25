import { $menuOpen } from "../../stores/menuOpen";
import { useStore } from "@nanostores/solid";
import IconClose from "../icons/IconClose";
import IconMenu from "../icons/IconMenu";

export default function NavButton() {
  const open = useStore($menuOpen);

  return (
    <button
      onClick={() => $menuOpen.set(!open())}
      aria-label={open() ? "Close Menu" : "Open Menu"}
      class="z-50 block duration-200 ease-linear motion-reduce:duration-0 xl:hidden"
      classList={{ "rotate-90": open() }}
    >
      {open() ? <IconClose /> : <IconMenu />}
    </button>
  );
}
