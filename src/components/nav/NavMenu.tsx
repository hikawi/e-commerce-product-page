import { useStore } from "@nanostores/solid";
import { $menuOpen } from "../../stores/menuOpen";
import NavLinks from "./NavLinks";

export default function NavMenu() {
  const open = useStore($menuOpen);

  return (
    <>
      {/* Mobile Menu */}
      <div
        class="fixed left-0 top-0 z-40 h-full w-full overflow-hidden bg-black bg-opacity-75 duration-200 xl:hidden"
        classList={{ "opacity-0 invisible": !open(), flex: open() }}
        onClick={() => $menuOpen.set(false)} // Close menu when clicking on the overlay.
      >
        <div
          class="flex h-full w-[15.625rem] flex-col gap-5 bg-white p-6 pt-24 text-lg font-bold text-n-very-dark-blue duration-200"
          classList={{
            "-translate-x-full": !open(),
            "translate-x-0": open(),
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing the menu when clicking on the menu itself.
        >
          <NavLinks />
        </div>
      </div>

      {/* Desktop Menu */}
      <div class="hidden items-center border-n-very-light-gray text-sm-md text-n-dark-grayish-blue xl:flex xl:h-full xl:items-end">
        <NavLinks />
      </div>
    </>
  );
}
