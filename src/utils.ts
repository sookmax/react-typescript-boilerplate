export function classNames(...args: (string | undefined | false)[]) {
  return args.filter(Boolean).join(" ");
}
