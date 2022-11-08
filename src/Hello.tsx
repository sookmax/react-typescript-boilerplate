type Props = {
  name?: string;
};

export default function Hello({ name }: Props) {
  return name ? <h1>Hello, {name}!</h1> : <span>Hey, stranger</span>;
}
