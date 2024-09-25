import { persistentAtom } from "@nanostores/persistent";

const $cart = persistentAtom<number>("cart", 0, {
  encode: JSON.stringify,
  decode: JSON.parse,
  listen: false,
});

export { $cart };
