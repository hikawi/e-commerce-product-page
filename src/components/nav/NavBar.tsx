import { createSignal } from "solid-js";
import IconMenu from "../icons/IconMenu";
import Logo from "../icons/Logo";
import IconClose from "../icons/IconClose";
import NavMenu from "./NavMenu";

export default function NavBar() {
  const [open, setOpen] = createSignal(false);

  return (
    <nav class="flex justify-between px-6 py-5">
      <NavMenu open={open()} />

      <div class="flex gap-4">
        <button
          onClick={() => setOpen(!open())}
          aria-label={open() ? "Close Menu" : "Open Menu"}
          class="z-10"
        >
          {open() ? <IconClose /> : <IconMenu />}
        </button>
        <Logo />
      </div>
    </nav>
  );
}
