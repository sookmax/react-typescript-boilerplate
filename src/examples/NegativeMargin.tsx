export default function NegativeMargin() {
  return (
    <div className="h-full">
      <div className="mb-12 h-1/2 bg-amber-500 opacity-50">
        <div className="mr-12 inline-block h-1/2 bg-indigo-500 opacity-50">
          div1
        </div>
        <div className="ml-10 inline-block h-1/2 bg-cyan-500 opacity-50">
          div2
        </div>
      </div>
      <div className="-mt-10 h-1/2 bg-green-500 opacity-50"></div>
    </div>
  );
}
