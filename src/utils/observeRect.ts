// https://github.com/reach/observe-rect

type Callback = (domRect: DOMRect) => void;

type NodeData = {
  rect?: DOMRect;
  callbacks: Set<Callback>;
};

const OBSERVED_NODES = new Map<Element, NodeData>();

const DOM_RECT_PROPS: (keyof DOMRect)[] = [
  "width",
  "height",
  "left",
  "right",
  "top",
  "bottom",
];

let rafId: number | undefined;

function hasRectPropChanged(currentRect: DOMRect, newRect: DOMRect) {
  return DOM_RECT_PROPS.some((prop) => currentRect[prop] !== newRect[prop]);
}

function startLoop() {
  OBSERVED_NODES.forEach((data, node) => {
    const newRect = node.getBoundingClientRect();
    if (!data.rect || hasRectPropChanged(data.rect, newRect)) {
      data.callbacks.forEach((cb) => cb(newRect));
      data.rect = newRect;
    }
  });

  rafId = requestAnimationFrame(startLoop);
}

export default function obeserveRect(node: Element, callback: Callback) {
  return {
    observe() {
      if (OBSERVED_NODES.has(node)) {
        OBSERVED_NODES.get(node)!.callbacks.add(callback);
      } else {
        OBSERVED_NODES.set(node, {
          callbacks: new Set<Callback>().add(callback),
        });
        startLoop();
      }
    },
    unObserve() {
      if (OBSERVED_NODES.has(node)) {
        OBSERVED_NODES.get(node)!.callbacks.delete(callback);
        if (OBSERVED_NODES.get(node)!.callbacks.size === 0) {
          OBSERVED_NODES.delete(node);
          // if no one's listening, stop the animation loop
          if (OBSERVED_NODES.size === 0 && rafId !== undefined) {
            cancelAnimationFrame(rafId);
          }
        }
      }
    },
  };
}
