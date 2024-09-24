import NavLinks from "./NavLinks";

export default function NavMenu(props: { open: boolean }) {
  return (
    <div
      class="fixed left-0 top-0 z-0 h-full w-full overflow-hidden bg-black bg-opacity-75 duration-200 lg:hidden"
      classList={{ "opacity-0": !props.open, flex: props.open }}
    >
      <div
        class="text-n-very-dark-blue flex h-full w-[15.625rem] flex-col gap-5 bg-white p-6 pt-24 text-lg font-bold duration-200"
        classList={{
          "-translate-x-full": !props.open,
          "translate-x-0": props.open,
        }}
      >
        <NavLinks />
      </div>
    </div>
  );
}
