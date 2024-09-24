import { For } from "solid-js";

// Darn, the classes here are so messy. I'm sure there's a better way to do this.
function NavLink(props: { text: string }) {
  return (
    <>
      {/* Mobile menu only needs a simple link */}
      <a href="/" class="block xl:hidden">
        {props.text}
      </a>

      {/* Desktop menu needs a lot of classes to handle */}
      <a
        href="/"
        class="hover:border-p-orange hover:text-n-very-dark-blue group hidden h-full items-center justify-center border-b-[4px] border-transparent px-4 xl:flex"
      >
        {props.text}
      </a>
    </>
  );
}

export default function NavLinks() {
  return (
    <For each={["Collections", "Men", "Women", "About", "Contact"]}>
      {(text) => <NavLink text={text} />}
    </For>
  );
}
